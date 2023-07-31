import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nestjs-modules/mailer';

import { 
  Injectable, 
  BadRequestException, 
  UnauthorizedException, 
  HttpException, 
  HttpStatus, 
  ConflictException, 
  InternalServerErrorException
} from '@nestjs/common';
import { Finca } from 'src/finca/schemas/finca.schema';
import { Usuario } from './schemas/usuario.schema';

import { CrearUsuarioDto } from './dto/crearUsuario.dto';
import { ROL } from './constantes';
import { NuevoEmpleadoDto } from './dto/nuevoEmpleado.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
    @InjectModel(Finca.name) private fincaModel: Model<Finca>,
    private readonly mailerService: MailerService,
  ) {}

  async usuarioTokenTienePriv(id_finca: string, _idUsuario: string){    
    return await this.fincaModel
      .findOne(
        {
          $and: [
            { _id: id_finca },
            {
              $or: [
                { _propietario: _idUsuario},
                // { 'colaboradores._usuario._id': _idUsuario }
                { 'colaboradores._usuario._id': _idUsuario, 'colaboradores.rol': ROL.ADMINISTRADOR }
              ]
            }
          ]
        }
      )
      .populate("_propietario")
      .populate("colaboradores._usuario")
  }

  async buscarPorEmail(email: string) {
    return await this.usuarioModel.findOne({ email: email });
  }

  async enviarEmail(
    correoDestino: string, 
    asunto: string,
    cuerpo: string,
  ){
    try {
      await this.mailerService.sendMail({
        to: correoDestino,
        subject: asunto,
        html: cuerpo,
      });
      console.log(`Correo enviado a ${correoDestino.substring(0, 6)}... `);
      
    } catch (error) {
      console.log(`Error al enviar el correo a ${correoDestino.substring(0, 6)}...`);
      console.error(error);
    }
  }

  generarContrasenaAleatoria(): string {
    const longitud = 5;
    let contrasena = '';
    const caracteres = '0123456789';
    const longitudCaracteres = caracteres.length;

    for (let i = 0; i < longitud; i++) {
      contrasena += caracteres.charAt(
        Math.floor(Math.random() * longitudCaracteres),
      );
    }

    return contrasena;
  }


  

  async obtenerUsuarioPorId(id: string){
    return await this.usuarioModel.find({_id: id});
  }

  
  async registroUsuario(nuevoUsuario: CrearUsuarioDto) {
    const existeusuario = await this.buscarPorEmail(nuevoUsuario.email);

    if(existeusuario){
      throw new ConflictException("El email ingresado ya se encuentra registrado");
    }
    nuevoUsuario.password = await hash(nuevoUsuario.password, 10);
    return await this.usuarioModel.create(nuevoUsuario);
  }

  async empleadosPorFinca(idFinca: string){
    const resp = await this.fincaModel
      .find({_id: idFinca})
      .select('colaboradores')
      .populate('colaboradores._usuario');

    const data = resp[0].colaboradores.map((colaborador:any) => ({
      nombres: colaborador._usuario.nombres,
      apellidos: colaborador._usuario.apellidos,
      email: colaborador._usuario.email,
      direccion: colaborador._usuario.direccion || "",
      rol: colaborador.rol,
    }));
    
    return data;
  }

  async nuevoEmpleado(idFinca:string, empleado:NuevoEmpleadoDto, us_autenticado) {
    const rol = empleado.rol;
    delete empleado.rol;
    
    const isAdmin = await this.usuarioTokenTienePriv(idFinca, us_autenticado._id);
        
    if(isAdmin){
      const colaboradores = [
        isAdmin._propietario.email,
        ...isAdmin.colaboradores.map((colaborador:any) => colaborador._usuario.email)
      ];

      if(colaboradores.find(colaborador => colaborador === empleado.email)){
        throw new ConflictException("El empleado a registrar ya es un colaborador de la finca");
      }
      try {
        const nombreFinca = isAdmin.nombre;
        let usuario:any = {};
        let nuevaContra:string;

        const usuRegistrado = await this.buscarPorEmail(empleado.email);

        if(!usuRegistrado){
          nuevaContra = this.generarContrasenaAleatoria();

          usuario = await this.usuarioModel.create({
            direccion: "",
            ...empleado,
            password: await hash(nuevaContra, 10),
          });
        }else{
          usuario = usuRegistrado;
        }

        // agregar empleado a la finca
        return await this.fincaModel
          .updateOne(
            { _id: idFinca },
            { $push: { colaboradores: { _usuario: usuario._id, rol } } }
          )
          .exec()
          .then(async res => {
            if(res){
              if(nuevaContra){
                await this.enviarEmail(empleado.email, "PIN para acceder a su cuenta", `
                  <p>Estimado/a ${empleado.nombres.toLocaleLowerCase()},</p>
                  <p>Le enviamos este correo electrónico para proporcionarle el PIN que necesita para acceder a su cuenta. El PIN es: <strong>${nuevaContra}</strong> .</p>
                  <p>Para usar el PIN, siga los siguientes pasos:</p>
                  <ol>
                    <li>Abra la aplicación en su dispositivo.</li>
                    <li>Ingrese su dirección de correo electrónico y la contraseña misma que es el PIN que se proporciona en este correo electrónico.</li>
                    <li>Haga clic en "Iniciar sesión" para acceder a su cuenta.</li>
                  </ol>
                  <p>Si tiene alguna pregunta o necesita ayuda adicional, no dude en ponerse en contacto con su administrador.</p>
                  <br/>
                  <p>Saludos.</p>
                `)
                .catch(err => {
                  console.error('El empleado ha sido registrado, pero no se ha podido enviar el correo de invitación');
                })
              }
               
              await this.enviarEmail(empleado.email, `Colaborador de la Finca ${nombreFinca}`, `
                <p>Estimado/a ${empleado.nombres},</p>
                <p>Le enviamos este correo electrónico para informarle que ha sido agregado por ${isAdmin._propietario.nombres} ${isAdmin._propietario.apellidos} como colaborador de una finca. Verifique su lista de fincas ingresando a la aplicación con su cuenta.</p>
                <p>Si tiene alguna pregunta o necesita ayuda adicional, no dude en ponerse en contacto con su administrador.</p>
                <br/>
                <p>Saludos.</p>
              `)
              .catch(error => {
                console.error('El empleado ha sido registrado, pero no se ha podido enviar el correo de invitación');
              });              
              return usuario;
            };

          })
          .catch(error => {
            throw new BadRequestException("Error al agregar al usuario como colaborador")
          })

          
      } catch (error) {
        throw new InternalServerErrorException("Ocurrio un error al procesar su solicitud")
      }
    }
    throw new UnauthorizedException('El usuario autenticado no es un administrador de la finca para admitir esta solicitud');
  }
  
}

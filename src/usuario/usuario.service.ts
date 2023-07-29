import { Injectable, BadRequestException, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schemas/usuario.schema';
import { Model } from 'mongoose';
import { CrearUsuarioDto } from './dto/crearUsuario.dto';
import { ROL } from './constantes';
import { hash } from 'bcrypt';
import { CrearTrabajadorDto } from './dto/crearTrabajador.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { NuevoEmpleadoDto } from './dto/nuevoEmpleado.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
    private readonly mailerService: MailerService,
  ) {}

  async buscarPorEmail(email: string) {
    return await this.usuarioModel.findOne({ email: email });
  }

  async registrarEmpleado(@Body() empleado: NuevoEmpleadoDto) {
    const registrado = await this.buscarPorEmail(empleado.email);

    if(registrado){
      throw new BadRequestException('El email del empleado ya se encuentra registrado');
    }
  }

  async crearAdministrador(usuario: CrearUsuarioDto) {
    const existeUsuario = await this.buscarPorEmail(usuario.email);
    if (existeUsuario)
      throw new BadRequestException('El email ya esta registrado');
    usuario.password = await hash(usuario.password, 10);
    return await this.usuarioModel.create({
      ...usuario,
      rol: ROL.ADMINISTRADOR,
    });
  }

  async crearTrabajador(trabajador: CrearTrabajadorDto) {
    const usuarioRegistrado = await this.buscarPorEmail(trabajador.email);
    if (!usuarioRegistrado){
      // generar contraseña
      // enviar correo con contraseña al usuario
        //si fue enviado, proceder
        // si no fue enviado, mostrar error y finalizar
    }
    // verificar si el usuario ya es colaborador de la finca
      // si lo es, bad request "El usuario ya se encuentra registrado como colaborador de la finca"

    // agregar usuario como colaborador, indicando el rol
      // si se agrego, notificar por correo que ha sido agregado como colaborador a la finca especifica 
      // en caso de error, bad request
      throw new BadRequestException('El email ya esta registrado');

    const contraseña = this.generarContrasenaAleatoria();
    await this.sendEmail(trabajador.email, contraseña);

    return await this.usuarioModel.create({
      nombres: trabajador.nombres,
      apellidos: trabajador.apellidos,
      email: trabajador.email,
      telefono: trabajador.telefono,
      rol: ROL.TRABAJADOR,
      password: await hash(contraseña, 10),
    });
  }

  async todosTrabajadores() {
    return await this.usuarioModel.find({ rol: ROL.TRABAJADOR });
  }

  async sendEmail(email: string, contrasena: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Envío de contraseña',
        html: `
          <h1>Contraseña para iniciar sesión</h1>
          <p>Tu contraseña es: <strong>${contrasena}</strong></p>
          <p>Por favor, asegúrate de mantener esta contraseña segura y no compartirla con nadie.</p>
          <p>¡Gracias!</p>
        `,
      });

      console.log('Correo electrónico enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
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
}

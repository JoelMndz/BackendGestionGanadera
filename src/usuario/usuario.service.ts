import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schemas/usuario.schema';
import { Model } from 'mongoose';
import { CrearUsuarioDto } from './dto/crearUsuario.dto';
import { ROL } from './constantes';
import { genSalt, hash } from 'bcrypt';
import { CrearTrabajadorDto } from './dto/crearTrabajador.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
    private readonly mailerService: MailerService,
  ) {}

  async buscarPorEmail(email: string) {
    return await this.usuarioModel.findOne({ email: email });
  }

  async crearAdministrador(usuario: CrearUsuarioDto) {
    const existeUsuario = await this.buscarPorEmail(usuario.email);
    if (existeUsuario) throw new BadRequestException('El email ya esta registrado');
    usuario.password = await hash(usuario.password, 10);
    return await this.usuarioModel.create({ ...usuario, rol: ROL.ADMINISTRADOR, });
  }

  async crearTrabajador(trabajador: CrearTrabajadorDto) {
    const usuarioRegistrado = await this.buscarPorEmail(trabajador.email);
    if (usuarioRegistrado)
      throw new BadRequestException('El email ya esta registrado');

    const contraseña = this.generarContrasenaAleatoria();
    await this.enviarContraseñaPorCorreo(trabajador.email, contraseña);

    return await this.usuarioModel.create({
      ...trabajador,
      rol: ROL.TRABAJADOR,
    });
  }

  async enviarContraseñaPorCorreo(
    email: string,
    password: string,
  ): Promise<void> {
    try {
      const mailOptions = {
        to: email,
        subject: 'Contraseña para iniciar seccion',
        text: `Tu contraseña es: ${password}`,
      };

      await this.mailerService.sendMail(mailOptions);

      console.log('Correo electrónico enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  }

  generarContrasenaAleatoria(): string {
    const length = 5;
    let password = '';
    const characters = '0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }

    return password;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CrearUsuarioDto } from 'src/usuario/dto/crearUsuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async iniciarSesion(email: string, password: string) {
    const usuario = await this.usuarioService.buscarPorEmail(email);
    if (!usuario || !(await compare(password, usuario.password))) {
      throw new UnauthorizedException();
    }
    const { _id } = usuario;
    const token = await this.jwtService.signAsync({ _id });
    return { usuario, token };
  }

  async registroAdministrador(usuario: CrearUsuarioDto) {
    const usuarioCreado = await this.usuarioService.crearAdministrador(usuario);
    const { _id } = usuarioCreado;
    const token = await this.jwtService.signAsync({ _id });
    return { usuario, token };
  }
}

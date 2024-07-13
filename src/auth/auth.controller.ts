import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CrearUsuarioDto } from 'src/usuario/dto/crearUsuario.dto';
import { AuthGuard } from './auth.guard';
import { IniciarSesionDto } from './dto/iniciarSesion.dto';
import { ApiBearerAuth, ApiConflictResponse, ApiOkResponse, ApiResponse, ApiTags} from '@nestjs/swagger';
import { IniciarSesionResponse } from './dto/inisiarSesionResponse.dto';
import {Request} from "express";
import { GuardPayload } from 'src/finca/constantes';
import { RestablecerPasswordDto } from 'src/usuario/dto/restablecerPassword.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController { 
  constructor(private authService: AuthService, private usuarioService: UsuarioService) {}

  @ApiOkResponse({ description: 'Inicio de sesión exitoso', type: IniciarSesionResponse, status:200})
  @ApiConflictResponse({ description: 'Usuario o contraseña incorrecta, no autorizado para ingresar', status:401 })
  @Post('iniciar-sesion')
  iniciarSesion(@Body() usuario: IniciarSesionDto) {
    return this.authService.iniciarSesion(usuario.email, usuario.password);
  }

  @ApiOkResponse({ description: 'Registro exitoso del nuevo usuario', type: IniciarSesionResponse, status: 201})
  @ApiResponse({ description: 'Usuario ya registrado, su email ya consta como regustrado', status: 409})
  @Post('registro')
  registro(@Body() usuario: CrearUsuarioDto) {
    return this.authService.registroUsuario(usuario);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('perfil')
  getProfile(@Req() req: Request & GuardPayload) {
    return req.usuario;
  }

  @Post('restablecer-password')
  restablecerPassword(@Body() dto: RestablecerPasswordDto) {
    return this.usuarioService.restablecerPassword(dto);
  }
}

import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CrearUsuarioDto } from 'src/usuario/dto/crearUsuario.dto';
import { AuthGuard } from './auth.guard';
import { IniciarSesionDto } from './dto/iniciarSesion.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import { IniciarSesionResponse, UsuarioResponse } from './dto/inisiarSesionResponse.dto';
import {Request} from "express";
import { GuardPayload } from 'src/finca/constantes';
import { CrearTrabajadorDto } from 'src/usuario/dto/crearTrabajador.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  
  @ApiOkResponse({ description: 'Inicio de sesión exitoso', type: IniciarSesionResponse })
  @Post('iniciar-sesion')
  iniciarSesion(@Body() usuario: IniciarSesionDto){
    return this.authService.iniciarSesion(usuario.email, usuario.password);
  }

  @ApiOkResponse({ description: 'Registro exitoso', type: IniciarSesionResponse })
  @Post('registro')
  registro(@Body() usuario:CrearUsuarioDto){
    return this.authService.registroAdministrador(usuario);
  }

  //@ApiOkResponse({ description: 'Registro exitoso', type: IniciarSesionResponse })
  @Post('registro-trabajador')
  registroTrabajador(@Body() trabajador: CrearTrabajadorDto){
    return this.authService.registroTrabajador(trabajador);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('perfil')
  getProfile(@Req() req: Request & GuardPayload) {
    return req.usuario;
  }
}

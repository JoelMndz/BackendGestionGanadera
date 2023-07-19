import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CrearUsuarioDto } from 'src/usuario/dto/crearUsuario.dto';
import { AuthGuard } from './auth.guard';
import { IniciarSesionDto } from './dto/iniciarSesion.dto';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/schemas/usuario.schema';
import { IniciarSesionResponse, UsuarioResponse } from './dto/inisiarSesionResponse.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  
  @ApiOkResponse({ description: 'Inicio de sesión exitoso', type: IniciarSesionResponse })
  @Post('iniciar-sesion')
  iniciarSesion(@Body() usuario: IniciarSesionDto){
    return this.authService.iniciarSesion(usuario.email, usuario.password);
  }

  @ApiOkResponse({ description: 'Registro exitoso', type: UsuarioResponse })
  @Post('registro')
  registro(@Body() usuario:CrearUsuarioDto){
    return this.authService.registroAdministrador(usuario);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('perfil')
  getProfile(@Req() req:any) {
    return req.usuario;
  }
}

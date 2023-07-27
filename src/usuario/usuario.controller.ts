import { Controller, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { CrearTrabajadorDto } from 'src/usuario/dto/crearTrabajador.dto';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @ApiBearerAuth()
  @Post('registro-trabajador')
  registroTrabajador(@Body() trabajador: CrearTrabajadorDto) {
    return this.usuarioService.crearTrabajador(trabajador);
  }
}

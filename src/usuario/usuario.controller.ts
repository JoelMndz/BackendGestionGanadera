import { 
  ApiBearerAuth, 
  ApiInternalServerErrorResponse, 
  ApiNotFoundResponse, 
  ApiOkResponse, 
  ApiTags, 
  ApiUnauthorizedResponse 
} from '@nestjs/swagger';
import { Controller, Body, Req, Post, Get, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { NuevoEmpleadoDto } from './dto/nuevoEmpleado.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GuardPayload } from 'src/finca/constantes';
import { ActualizarUsuarioDto } from './dto/actualizarUsuario.dto';

@ApiTags('Módulo: Usuario')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @ApiOkResponse({description: "Usuario encontrado exitosamente"})
  @ApiNotFoundResponse({description: "Usuario no encontrado"})
  @Get('/:id')
  obtenerDatosPorUsuario(@Param('id') id:string) {
    return this.usuarioService.obtenerUsuarioPorId(id);
  } 
  
  
  @ApiOkResponse({description: "Lista de empleados por la finca específicada como parámetro"})
  @Get('finca/:id')
  listaEmpleadosPorFinca(@Param('id') id:string) {
    return this.usuarioService.empleadosPorFinca(id);
  };


  @ApiOkResponse({description: "Un administrador/propietario puede registrar un nuevo empleado y asignarlo como colaborador de la finca, estableciendo el rol que cumplira el nuevo empleado"})
  @ApiUnauthorizedResponse({description: "Usuario no administrador o o no pertenece como miembro de finca"})
  @ApiInternalServerErrorResponse({description: "Error en proceso de solicitud, email no enviado"})
  @Post('finca/:id/empleado')
  nuevoEmpleado(
    @Req() req: Response & GuardPayload,
    @Param('id') id:string, 
    @Body() empleado: NuevoEmpleadoDto
  ) {
    return this.usuarioService.nuevoEmpleado(id, empleado, req.usuario);
  };

  @Delete(':idFinca/:idEmpleado')
  eliminarEmpleado(
    @Param('idFinca') idFinca:string, 
    @Param('idEmpleado') idEmpleado:string,
  ) {
    return this.usuarioService.eliminarEmpleado(idFinca, idEmpleado);
  };

  @Patch('actualizar-usuario')
  actualizarUsuario(
    @Body() usuarioDto:ActualizarUsuarioDto,
    @Req() req: Response & GuardPayload){
    return this.usuarioService.actualizarUsuario(usuarioDto, req.usuario._id);
  }
}

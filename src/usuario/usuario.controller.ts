import { 
  ApiBearerAuth, 
  ApiInternalServerErrorResponse, 
  ApiNotFoundResponse, 
  ApiOkResponse, 
  ApiTags, 
  ApiUnauthorizedResponse 
} from '@nestjs/swagger';
import { Controller, Body, Req, Post, Get, UseGuards, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { NuevoEmpleadoDto } from './dto/nuevoEmpleado.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GuardPayload } from 'src/finca/constantes';

@ApiTags('Módulo: Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @ApiOkResponse({description: "Usuario encontrado exitosamente"})
  @ApiNotFoundResponse({description: "Usuario no encontrado"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/:id')
  obtenerDatosPorUsuario(@Param('id') id:string) {
    return this.usuarioService.obtenerUsuarioPorId(id);
  } 
  
  
  @ApiOkResponse({description: "Lista de empleados por la finca específicada como parámetro"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('finca/:id')
  listaEmpleadosPorFinca(@Param('id') id:string) {
    return this.usuarioService.empleadosPorFinca(id);
  };


  @ApiOkResponse({description: "Un administrador/propietario puede registrar un nuevo empleado y asignarlo como colaborador de la finca, estableciendo el rol que cumplira el nuevo empleado"})
  @ApiUnauthorizedResponse({description: "Usuario no administrador o o no pertenece como miembro de finca"})
  @ApiInternalServerErrorResponse({description: "Error en proceso de solicitud, email no enviado"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('finca/:id/empleado')
  nuevoEmpleado(
    @Req() req: Response & GuardPayload,
    @Param('id') id:string, 
    @Body() empleado: NuevoEmpleadoDto
  ) {
    return this.usuarioService.nuevoEmpleado(id, empleado, req.usuario);
  };

}

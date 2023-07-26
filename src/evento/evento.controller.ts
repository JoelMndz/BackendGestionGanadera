import { Controller, Get, Req, UseGuards, Put, Delete, Body, Post, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { EventoService } from './evento.service';
import { CrearEventoDto } from './dto/crearEvento.dto';
import { EditarEventoDto } from './dto/editarEvento.dto';
import { GuardPayload } from 'src/finca/constantes';

@ApiBearerAuth()
@ApiTags('evento')
@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @ApiResponse({description: 'Retorna un array de los eventos asociados a una finca especifica'})
  @UseGuards(AuthGuard)
  @Get('/:fincaId')
  ObtenerEventosPorFinca(@Param('fincaId') fincaId:string){
    return this.eventoService.obtenerEventos(fincaId);

  }

  @ApiResponse({description: "Crear evento por medio de la relación de fincas, es decir, debe crear una finca y asociar la finca con el evento"})
  @UseGuards(AuthGuard)
  @Post('nuevo-evento/:fincaId')
  crearEvento(@Param('fincaId') fincaId:string, @Body() evento: CrearEventoDto ){
    return this.eventoService.crearEvento(fincaId, evento);
  }

  @ApiResponse({description: "Actualizar evento ya realizado, ingrese id del evento y su nueva data. Como return obtiene el valor actualizado"})
  @UseGuards(AuthGuard)
  @Put(':id')
  actualizarEvento(@Param('id') id:string, @Body() newData: EditarEventoDto ){
    return this.eventoService.actualizarEvento(id, newData);
  }

  @ApiResponse({description: "Eliminar evento"})
  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminarEvento(@Param('id') id:string, @Req() req:Request & GuardPayload ){ 
    return this.eventoService.eliminarEvento(id);
  }  

}
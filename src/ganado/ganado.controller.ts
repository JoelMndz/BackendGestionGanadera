import { Controller, Delete, Get, Param, Patch, Put, UseGuards, Post, Body, Req } from '@nestjs/common';
import { GanadoService, ProduccionLecheService } from './ganado.service';
import { CrearGanadoDto } from './dto/crearGanado.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AgregarPesoDto } from './dto/agregarPeso.dto';
import { ActualizarGanadoDto } from './dto/actualizarGanado.dto';
import { ProduccionLecheDto } from './dto/nuevaProduccionLeche.dto';
import { GuardPayload } from 'src/finca/constantes';

@ApiTags('ganado')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('ganado')
export class GanadoController {
  constructor(
    private ganadoService: GanadoService
  ) { }

  @Get('obtener-ganado-por-finca/:idFinca')
  obtenerGanadoPorFinca(@Param('idFinca') idFinca:string){
    return this.ganadoService.obtenerGanadoPorFinca(idFinca)
  }

  @Post('crear-ganado')
  crearGanado(@Body() ganado: CrearGanadoDto) {
    return this.ganadoService.crearGanado(ganado);
  }
  
  @Put('agregar-peso')
  agregarPeso(@Body() pesoDto: AgregarPesoDto){
    return this.ganadoService.agregarPeso(pesoDto);
  }

  @Patch('actualizar-ganado')
  actualizarGanado(@Body() ganadoDto: ActualizarGanadoDto){
    return this.ganadoService.actualizarGanado(ganadoDto);
  }

  @Delete('eliminar-ganado/:idGanado')
  eliminaGanado(@Param('idGanado') idGanado: string){
    return this.ganadoService.eliminarGanado(idGanado)
  }
}


@ApiTags('Módulo de Producción')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('produccion/leche')
export class ProduccionLecheController {

  constructor(
    private prodLecheService: ProduccionLecheService
  ){};


  @Get('/:finca/:vaca')
  obtenerRegistros(@Param('vaca') vaca:string, @Param('finca') finca:string){
    return this.prodLecheService.obtenerRegistrosLeches(finca, vaca)
  }

  @Post()
  nuevaProduccion(@Body() data: ProduccionLecheDto, @Req() req: GuardPayload) {
    return this.prodLecheService.nuevaProduccionLeche(
      data._finca, 
      req.usuario._id,
      data._vaca,
      data.litros,
      data.horario,
      data.fecha
    )
  }

}

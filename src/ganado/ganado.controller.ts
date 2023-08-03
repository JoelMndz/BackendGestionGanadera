import { Controller, Delete, Get, Param, Patch, Put } from '@nestjs/common';
import { GanadoService } from './ganado.service';
import { Post, Body, UseGuards } from "@nestjs/common";
import { CrearGanadoDto } from './dto/crearGanado.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AgregarPesoDto } from './dto/agregarPeso.dto';
import { ActualizarGanadoDto } from './dto/actualizarGanado.dto';

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

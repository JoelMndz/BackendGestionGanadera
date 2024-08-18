import { Controller, Get, UseGuards, Req, Body, Post, Patch, Delete, Param } from '@nestjs/common';
import { FincaService } from './finca.service';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {Request} from "express";
import { GuardPayload } from './constantes';
import { CrearFincaDto } from './dto/crearFinca.dto';
import { ActualizarFincaDto } from './dto/actualizarFinca.dto';

@ApiBearerAuth()
@ApiTags('finca')
@Controller('finca')
export class FincaController {
  
  constructor(private fincaService:FincaService){}

  @ApiOkResponse({ description: 'Devuelve un array con todas las fincas'})
  @UseGuards(AuthGuard)
  @Get('obtener-fincas-por-usuario')
  obtenerFincasPorUsuario(@Req() req:Request & GuardPayload){
    return this.fincaService.obtenerFincasPorUsuario(req.usuario._id);
  }

  @ApiResponse({ description: 'Devuelve la finca ingresada'})
  @UseGuards(AuthGuard)
  @Post('crear-finca')
  crearFinca(@Req() req:Request & GuardPayload, @Body() finca:CrearFincaDto){
    return this.fincaService.crearFinca(req.usuario._id, finca);
  }

  @ApiResponse({ description: 'Devuelve la finca actualizada'})
  @UseGuards(AuthGuard)
  @Patch('actualizar-finca')
  actualizarFinca(@Body() finca:ActualizarFincaDto){
    return this.fincaService.actualizarFinca(finca);
  }

  @Delete('/:id')
  eliminarFinca(@Param('id') id:string){
    return this.fincaService.eliminarFinca(id)
  }
}

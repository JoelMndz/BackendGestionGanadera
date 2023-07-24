import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { FincaService } from './finca.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {Request} from "express";
import { GuardPayload } from './constantes';

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

}

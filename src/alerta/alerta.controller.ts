import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@ApiTags('alerta')
@UseGuards(AuthGuard)
@Controller('alerta')
export class AlertaController {

  constructor(private alertarService:AlertaService){}

  @Get('obtener-alertas-por-finca/:idFinca')
  obtenerAlertarPorFinca(@Param('idFinca') idFinca: string){
    return this.alertarService.obtenerAlertasPorFinca(idFinca);
  }
}

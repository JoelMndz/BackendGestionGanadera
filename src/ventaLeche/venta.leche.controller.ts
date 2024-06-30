import { Controller, Req, UseGuards, Body, Param, Post, Get, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { GuardPayload } from 'src/finca/constantes';
import { VentaLecheService } from './venta.leche.service';
import { NuevaVentaDto } from './dto/nuevaVenta.dto';

@ApiBearerAuth()
@ApiTags('Módulo: Venta de Leche')
@Controller('venta/leche')
export class VentaLecheController {
  constructor(private readonly ventaLecheService: VentaLecheService) {}
  
  @ApiResponse({description: "Genera una nueva venta de leche con un comprador y litros a vender/consumo. Retorna el elemento guardado"})
  @UseGuards(AuthGuard)
  @Post('/:fincaId')
  nuevaVentaLeche(
    @Param('fincaId') fincaId:string, 
    @Body() newVenta: NuevaVentaDto, 
    @Req() req:Response & GuardPayload 
  ){
    return this.ventaLecheService.nuevaVentaLeche(fincaId, newVenta, req.usuario._id);
  }

  @ApiResponse({ description: 'Devuelve la lista de ventas por finca'})
  @UseGuards(AuthGuard)
  @ApiQuery({name: 'fechaInicio', required: true, type: String})
  @ApiQuery({name: 'fechaFin', required: true, type: String})
  @Get('/:fincaId')
  obtenerVentasPorFinca(@Param('fincaId') fincaId:string, @Query('fechaInicio') inicio: string,  @Query('fechaFin') fin: string){
    return this.ventaLecheService.obtenerVentasPorFinca(fincaId,inicio,fin);
  }

}
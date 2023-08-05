import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CrearInseminacionDto } from "./dto/reproduccion/crearInseminacion.dto";
import { InseminacionService } from "./reproduccion.service";
import { GuardPayload } from "src/finca/constantes";

@ApiBearerAuth()
@ApiTags('Módulo Ganado: Reproducción')
@Controller('ganado/reproduccion/inseminacion')
export class InseminacionController{

  constructor(
    private inseminacionService: InseminacionService,
  ){}

  @Get('/:vacaId')
  obtenerInseminaciones(@Param('vacaId') vacaId:string){
    return this.inseminacionService.obtenerInseminaciones(vacaId);
  }

  @Post()
  nuevaInseminacion(@Body() body:CrearInseminacionDto, @Req() req: Request & GuardPayload){
    return this.inseminacionService.nuevaInseminacion(body);
  }

}
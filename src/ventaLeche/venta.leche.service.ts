import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { NuevaVentaDto } from './dto/nuevaVenta.dto';
import { VentaLeche } from "./schema/venta.leche.schema";
import { Finca } from 'src/finca/schemas/finca.schema';


@Injectable()
export class VentaLecheService{

  constructor(
    @InjectModel(VentaLeche.name) private ventaLecheModel: Model<VentaLeche>,
    @InjectModel(Finca.name) private fincaModelo: Model<Finca>,    
  ) {}

  async nuevaVentaLeche(fincaId: string, evento:NuevaVentaDto, usuarioId:string){
    return await this.ventaLecheModel.create({
      _finca: fincaId,
      ...evento
    });
  }

  async obtenerVentasPorFinca(fincaId: string){
    return await this.ventaLecheModel.find({
      _finca: fincaId,
    });
  }

}
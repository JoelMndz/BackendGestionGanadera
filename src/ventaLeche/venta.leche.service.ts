import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { NuevaVentaDto } from './dto/nuevaVenta.dto';
import { VentaLeche } from "./schema/venta.leche.schema";
import { Finca } from 'src/finca/schemas/finca.schema';
import * as moment from "moment";


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

  async obtenerVentasPorFinca(fincaId: string, inicio:string, fin:string){
    let ventas = await this.ventaLecheModel.find({
      _finca: fincaId,
    });
    
    ventas = ventas.filter(x => moment(x.fecha).isBetween(moment(inicio),moment(fin),undefined,'[]'))
    return ventas;
  }

}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { NuevaVentaDto } from './dto/nuevaVenta.dto';
import { VentaLeche } from "./schema/venta.leche.schema";
import { Finca } from 'src/finca/schemas/finca.schema';

async function validarFincaUsuario(fincaModelo: Model<Finca>, id_finca:string, usuarioId:string){
  const autorizado = await fincaModelo.findOne({
    $and: [
      { _id: id_finca },
      {
        $or: [
          { _propietario: usuarioId },
          { colaboradores: { $in: usuarioId } },
        ]
      }
    ]
  }).populate('colaboradores');

  return autorizado ? true : false;
}

@Injectable()
export class VentaLecheService{

  constructor(
    @InjectModel(VentaLeche.name) private ventaLecheModel: Model<VentaLeche>,
    @InjectModel(Finca.name) private fincaModelo: Model<Finca>,    
  ) {}

  async nuevaVentaLeche(fincaId: string, evento:NuevaVentaDto, usuarioId:string){
    const autorizado = await validarFincaUsuario(this.fincaModelo, fincaId, usuarioId);
    
    if(!autorizado){
      throw new UnauthorizedException("Finca no encontrada o el usuario no pertenece a la finca");
    }
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
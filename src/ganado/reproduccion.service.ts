import { ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CrearInseminacionDto } from "./dto/reproduccion/crearInseminacion.dto";
import { Model } from "mongoose";
import { Inseminacion } from "./schema/inseminacion.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Ganado } from "./schema/ganado.schema";

@Injectable()
export class InseminacionService {

  constructor(
    @InjectModel(Inseminacion.name) private inseminacionModelo: Model<Inseminacion>,
    @InjectModel(Ganado.name) private ganadoModelo: Model<Ganado>,
  ){}

  async obtenerInseminaciones(vaca_id:string){    
    return await this.inseminacionModelo
      .find({
        _vaca: vaca_id
      })
      .populate('_vaca')
      .populate('_toro')
      .sort({fecha: -1})
      .exec();
  }

  async nuevaInseminacion(body: CrearInseminacionDto){
    const {  _vaca:vaca_id, _toro:animal, fecha, tipo, numeroPajilla, nota } = body;
    const fechaMinimaEdad = new Date();
    //fechaMinimaEdad.setFullYear(fechaMinimaEdad.getFullYear() - 2);

    const existeVaca = await this.ganadoModelo
      .findOne({
        _id: vaca_id,
        //fechaNacimiento: {$lt: fechaMinimaEdad},
        sexo: 'hembra'
      })
      .populate('_finca');

    if(existeVaca){
      const toro = await this.ganadoModelo
        .findOne({
          _id : animal,
          fechaNacimiento: {$lt: fechaMinimaEdad},
          etapa: 'toro'
        });

      if(toro){
        try {
          return await this.inseminacionModelo.create({
            _vaca: vaca_id,
            _toro: animal,
            fecha,
            tipo,
            numeroPajilla,
            nota
          });
        } catch (error) {
          throw new InternalServerErrorException("Error al guardar su inseminación")
        }
      }
      throw new ForbiddenException("El macho seleccionado no cuenta con edad suficiente para aparecio")
    }
    throw new ForbiddenException("Vaca no encontrada o no es adulta para procesar")
  }

}
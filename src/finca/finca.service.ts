import { BadRequestException, Injectable } from '@nestjs/common';
import { Finca } from './schemas/finca.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CrearFincaDto } from './dto/crearFinca.dto';

@Injectable()
export class FincaService {
  constructor(@InjectModel(Finca.name) private fincaModel: Model<Finca>) { }

  async obtenerFincasPorUsuario(usuarioId: string) {
    return await this.fincaModel.find({ 
        $or: [
          { _propietario: usuarioId }, 
          { colaboradores: { $in: usuarioId } }
        ]
      })
      .populate('colaboradores')
  }

  async crearFinca(usuarioId: string, finca:CrearFincaDto){
    if(finca.area < finca.areaGanadera)
      new BadRequestException('El area ganadera no puede ser mayor que el area')
      
    return await this.fincaModel.create({
      _propietario: usuarioId,
      ...finca
    })
  }
}

import { Injectable } from '@nestjs/common';
import { Finca } from './schemas/finca.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { Finca } from './schemas/finca.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CrearFincaDto } from './dto/crearFinca.dto';
import { Usuario } from '../usuario/schemas/usuario.schema';


@Injectable()
export class FincaService {
  constructor(@InjectModel(Finca.name) private fincaModel: Model<Finca>,
  @InjectModel(Finca.name) private usuarioModel: Model<Usuario>) { }

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
    return await this.fincaModel.create({
      _propietario: usuarioId,
      ...finca
    })
  }

  async agregarTrabajador(idFinca: string, idTrabajador: string) {
    try {
      const finca = await this.fincaModel.findById(idFinca);
      if (!finca) {
        throw new BadRequestException('La finca no existe');
      }

      const trabajadorYaAgregado = finca.colaboradores.some(
        (colaborador) => colaborador.toString() === idTrabajador
      );

      if (trabajadorYaAgregado) {
        throw new BadRequestException('El trabajador ya está agregado a la finca');
      }

      const trabajador = await this.usuarioModel.findById(idTrabajador);
      if (!trabajador) {
        throw new BadRequestException('El trabajador no existe');
      }

      finca.colaboradores.push(trabajador);

      await finca.save();

      console.log('Trabajador agregado a la finca correctamente.');
    } catch (error) {
      console.error('Error al agregar el trabajador a la finca:', error);
      throw error;
    }
  }
}

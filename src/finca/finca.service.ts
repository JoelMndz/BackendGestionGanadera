import { BadRequestException, Injectable } from '@nestjs/common';
import { Finca } from './schemas/finca.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CrearFincaDto } from './dto/crearFinca.dto';
import { Usuario } from '../usuario/schemas/usuario.schema';
import { ROL } from 'src/usuario/constantes';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CrearAlertaEvento } from 'src/alerta/events/crearAlerta.events';
import { ActualizarFincaDto } from './dto/actualizarFinca.dto';


@Injectable()
export class FincaService {
  constructor(
    @InjectModel(Finca.name) private fincaModel: Model<Finca>,
    @InjectModel(Finca.name) private usuarioModel: Model<Usuario>,
    private eventEmitter: EventEmitter2) { }

  async obtenerFincasPorUsuario(usuarioId: string) {
    return await this.fincaModel.find({ 
      $and: [
        { eliminado: { $ne: true } },
        { 
          $or: [
            { _propietario: usuarioId }, 
            { "colaboradores._usuario": { $in: usuarioId } }
          ]
        }
      ]
      })
      .populate('colaboradores')
  }

  async crearFinca(usuarioId: string, finca:CrearFincaDto){
    if(finca.area < finca.areaGanadera)
      new BadRequestException('El area ganadera no puede ser mayor que el area')
    
    const nuevaFinca =  await this.fincaModel.create({
      _propietario: usuarioId,
      ...finca
    })

    this.eventEmitter.emit('alertar', new CrearAlertaEvento(
      'Finca creada',
      `Se ha creado una finca: ${nuevaFinca.nombre}`,
      nuevaFinca._id.toString()))
    return nuevaFinca
  }

  async actualizarFinca(finca:ActualizarFincaDto){
    const existeFinca = await this.fincaModel.findById(finca._id)
    if (!existeFinca) throw new BadRequestException('La finca no existe!')

    if(finca.area < finca.areaGanadera)
      new BadRequestException('El area ganadera no puede ser mayor que el area')
    
    const fincActualizada =  await this.fincaModel.findByIdAndUpdate(finca._id,{
      ...finca
    })

    this.eventEmitter.emit('alertar', new CrearAlertaEvento(
      'Finca actualizada',
      `Se ha actualizado una finca: ${fincActualizada.nombre}`,
      fincActualizada._id.toString()))
    return await this.fincaModel.findById(finca._id);
  }

  async eliminarFinca(idFinca: string){
    const existeFinca = await this.fincaModel.findById(idFinca)
    if (!existeFinca) throw new BadRequestException('La finca no existe!')

    const fincActualizada =  await this.fincaModel.findByIdAndUpdate(idFinca,{
      eliminado: true
    })

    this.eventEmitter.emit('alertar', new CrearAlertaEvento(
      'Finca eliminada',
      `Se ha eliminado una finca: ${fincActualizada.nombre}`,
      fincActualizada._id.toString()))
    return fincActualizada
  }

  async agregarTrabajador(idFinca: string, idTrabajador: string) {
    try {
      const finca = await this.fincaModel.findById(idFinca);
      if (!finca) {
        throw new BadRequestException('La finca no existe');
      }

      const trabajadorYaAgregado = finca.colaboradores.some(
        (colaborador) => colaborador._usuario.toString() === idTrabajador
      );

      if (trabajadorYaAgregado) {
        throw new BadRequestException('El trabajador ya está agregado a la finca');
      }

      const trabajador = await this.usuarioModel.findById(idTrabajador);
      if (!trabajador) {
        throw new BadRequestException('El trabajador no existe');
      }

      finca.colaboradores.push({_usuario: trabajador._id.toString(), rol: ROL.TRABAJADOR});

      await finca.save();

      this.eventEmitter.emit('alertar', new CrearAlertaEvento(
        'Nuevo Trabajador',
        `Se ingreso el trabajador: ${trabajador.nombres} ${trabajador.apellidos}`,
        idFinca))
    } catch (error) {
      console.error('Error al agregar el trabajador a la finca:', error);
      throw error;
    }
  }
}

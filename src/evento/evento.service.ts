import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CrearEventoDto } from './dto/crearEvento.dto';
import { EditarEventoDto } from './dto/editarEvento.dto';
import { Evento } from "./schema/evento.shema";
import { Finca } from 'src/finca/schemas/finca.schema';
import { ApiResponse } from '@nestjs/swagger';
import { FincaService } from 'src/finca/finca.service';

async function validarFincaUsuario(fincaModelo: Model<Finca>, id_finca:string, usuarioId:string){
  const autorizado = await fincaModelo.findOne({
    $and: [
      { _id: id_finca },
      {
        $or: [
          { _propietario: usuarioId },
          { "colaboradores._usuario._id": usuarioId },
        ]
      }
    ]
  }).populate('colaboradores');

  return autorizado ? true : false;
}

@Injectable()
export class EventoService{

  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<Evento>,
    @InjectModel(Finca.name) private fincaModelo: Model<Finca>,    
  ) {}

  async obtenerEventos(fincaId: string, usuarioId: string){   
    const autorizado = await validarFincaUsuario(this.fincaModelo, fincaId, usuarioId);
    
    if(!autorizado){
      throw new UnauthorizedException("Finca no encontrada en los registros del usuario");
    }    
    return await this.eventoModel.find({ _finca: fincaId }).populate('_finca');
  }

  async crearEvento(fincaId: string, evento:CrearEventoDto, usuarioId:string){
    const autorizado = await validarFincaUsuario(this.fincaModelo, fincaId, usuarioId);
    
    if(!autorizado){
      throw new UnauthorizedException("Finca no encontrada o el usuario no pertenece a la finca");
    }
    return await this.eventoModel.create({
      _finca: fincaId,
      ...evento
    });
  }

  async actualizarEvento(eventoId: string, nuevoValor:EditarEventoDto, usuarioId:string){  
    const autorizado = await validarFincaUsuario(this.fincaModelo, nuevoValor._finca, usuarioId);

    if(!autorizado){
      throw new UnauthorizedException("No tienes lo permisos para editar este evento");
    }
    return await this.eventoModel.findByIdAndUpdate(eventoId, nuevoValor, { 
      new: true
    }).exec();
  }

  async eliminarEvento(eventoId: string, usuarioId:string){
    const idFinca = await this.eventoModel.find({_id: eventoId}).exec();
    const autorizado = await this.fincaModelo.findOne({
      $and: [
        { _id: idFinca[0]._finca },
        { _propietario: usuarioId }
      ]
    }).populate('colaboradores');

    if(!autorizado){
      throw new UnauthorizedException("No eres propietario de este evento para eliminarlo");
    }
    return await this.eventoModel.findByIdAndDelete(eventoId, { 
      new: true
    }).exec();
  }

}
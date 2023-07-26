import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { Evento } from "./schema/evento.shema";
import { InjectModel } from '@nestjs/mongoose';
import { CrearEventoDto } from './dto/crearEvento.dto';
import { EditarEventoDto } from './dto/editarEvento.dto';

@Injectable()
export class EventoService{

  constructor(@InjectModel(Evento.name) private eventoModel: Model<Evento>) {}

  async obtenerEventos(fincaId: string){       
    return await this.eventoModel.find({ _finca: fincaId }).exec();
  }

  async crearEvento(fincaId: string, evento:CrearEventoDto){       
    return await this.eventoModel.create({
      _finca: fincaId,
      ...evento
    });
  }

  async actualizarEvento(eventoId: string, nuevoValor:EditarEventoDto){  
    return await this.eventoModel.findByIdAndUpdate(eventoId, nuevoValor, { 
      new: true
    }).exec();
  }

  async eliminarEvento(eventoId: string){
    return await this.eventoModel.findByIdAndDelete(eventoId, { 
      new: true
    }).exec();
  }

}
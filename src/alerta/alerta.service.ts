/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CrearAlertaEvento } from './events/crearAlerta.events';
import { InjectModel } from '@nestjs/mongoose';
import { Alerta } from './schema/alerta.schema';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlertaService {
  constructor(
    @InjectModel(Alerta.name)
    private alertaModel: Model<Alerta>
  ){}

  @OnEvent('alertar')
  async crearAlerta(alertaDto: CrearAlertaEvento){
    return await this.alertaModel.create(alertaDto)
  }

  async obtenerAlertasPorFinca(idFinca:string){
    return await this.alertaModel.find({_finca: idFinca})
  }
}

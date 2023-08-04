import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HORARIO_ORDENO } from "../constantes";
import mongoose from "mongoose";

@Schema()
export class ProduccionLeche{
  @Prop({required: true})
  litros: number;
  
  @Prop({required: true})
  fecha: Date;

  @Prop({
    required: true,
    enum: HORARIO_ORDENO,
    default: HORARIO_ORDENO.MAÑANA
  })
  horario: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ganado'
  })
  _vaca: string
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Finca'
  })
  _finca: string
}

export const ProduccionLecheSchema = SchemaFactory.createForClass(ProduccionLeche);
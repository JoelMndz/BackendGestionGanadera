import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TIPO_INSEMINCACION } from "../constantes";
import mongoose from "mongoose";
import { Ganado } from "./ganado.schema";

@Schema()
export class Inseminacion{
  @Prop({required: true})
  fecha: Date;
  
  @Prop({required: true})
  numeroPajilla: string;
  
  @Prop({
    required: true,
    enum: TIPO_INSEMINCACION,
  })
  tipo: string;

  @Prop()
  nota: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ganado'
  })
  _vaca: Ganado
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ganado'
  })
  _toro: Ganado
}

export const InsemincacionSchema = SchemaFactory.createForClass(Inseminacion);
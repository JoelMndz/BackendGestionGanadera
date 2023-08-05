import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SEXO } from "../constantes";
import mongoose from "mongoose";

@Schema()
export class Parto{
  @Prop({required: true})
  fecha: Date;
  
  @Prop({default: false})
  aborto: Boolean;
  
  @Prop()
  nota: string;
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ganado'
  })
  _vaca: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ganado',
    default: null
  })
  _hijo: string
}

export const PartoSchema = SchemaFactory.createForClass(Parto);
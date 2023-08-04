import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema()
export class Alerta{
  @Prop({required: true})
  titulo: string

  @Prop({required: true})
  descripcion: string

  @Prop({
    type: Date,
    default: Date.now()
  })
  fecha: Date

  @Prop({
    required:true,
    type: mongoose.Schema.Types.ObjectId, ref: 'Finca'
  })
  _finca: string
}

export const AlertaSchema = SchemaFactory.createForClass(Alerta)
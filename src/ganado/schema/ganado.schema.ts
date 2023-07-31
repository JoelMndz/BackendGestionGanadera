import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ESTADO_GANADO, SEXO } from "../constantes";
import mongoose from "mongoose";

@Schema()
export class Ganado{
  @Prop({required: true})
  nombre: string;

  @Prop()
  numero: string;

  @Prop({
    required:true,
    enum: SEXO,
  })
  sexo: string;

  @Prop()
  etapa:string;

  @Prop()
  raza: string

  @Prop()
  proposito: string

  @Prop({required: true})
  fechaNacimiento: Date

  @Prop({
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ganado'
  })
  _padre: string
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ganado'
  })
  _madre: string

  @Prop({
    type: [{
      fecha: Date,
      peso: Number,
      alimentacion: String,
      notas: String
    }]
  })
  pesos: {
    fecha: Date,
    peso: number
    alimentacion: String,
    notas: String,
  }[]

  @Prop({
    type: String,
    default: null,
  })
  fotoURL: string
  
  @Prop({
    type: String,
    enum: ESTADO_GANADO,
    default: ESTADO_GANADO.EN_LA_FINCA
  })
  estado: string
  
  @Prop({
    type: Boolean,
    default: false
  })
  favorito: boolean

  @Prop()
  lote: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ganado'
  })
  _finca: string
}

export const GanadoSchema = SchemaFactory.createForClass(Ganado);
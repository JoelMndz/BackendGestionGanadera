import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Finca } from "src/finca/schemas/finca.schema";

@Schema()
export class Evento{
  @Prop({
    required:true,
    type: mongoose.Schema.Types.ObjectId, ref: 'Finca'
  })
  _finca: Finca

  @Prop({required: true})
  nombre: string;

  @Prop({required: true})
  fecha: string;
  
  @Prop({required: true})
  horaInicio: string;

  @Prop({required: true})
  horaFinalizacion: string;

  @Prop({
    default: [],
    type: Array<string>
  })
  participantes: [string];

  @Prop()
  nota: string;

}

export const EventoSchema = SchemaFactory.createForClass(Evento);
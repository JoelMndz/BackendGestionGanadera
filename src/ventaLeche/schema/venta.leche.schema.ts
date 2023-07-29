import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Finca } from "src/finca/schemas/finca.schema";

@Schema()
export class VentaLeche{  
  @Prop({required: true})
  comprador: string;
  
  @Prop({required: true})
  fecha: string;
  
  @Prop({required: true})
  cantidadLitros: number;
  
  @Prop({required: true})
  numeroPotrero: number;
  
  @Prop({required: true})
  consumoTerneros: number;
  
  @Prop({required: true})
  consumoCasa: number;
  
  @Prop({
    required:true,
    type: mongoose.Schema.Types.ObjectId, ref: 'Finca'
  })
  _finca: Finca
}

export const VentaLecheSchema = SchemaFactory.createForClass(VentaLeche);
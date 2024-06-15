import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Finca } from "src/finca/schemas/finca.schema";

@Schema()
export class VentaLeche{  
  @Prop({required: true})
  comprador: string;
  
  @Prop({required: true})
  fecha: string;
  
  @Prop({type:Object,required: true})
  litros: {
    venta: number,
    proyecto: number,
    terneras: number,
    otros: number
  };
  
  @Prop({required: true})
  vacarSacadas: number

  @Prop({required: true})
  novedades: string

  @Prop({
    required:true,
    type: mongoose.Schema.Types.ObjectId, ref: 'Finca'
  })
  _finca: Finca
}

export const VentaLecheSchema = SchemaFactory.createForClass(VentaLeche);
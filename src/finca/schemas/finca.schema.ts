import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { TIPO_MEDIDAS, TIPO_PROPOSITO } from "../constantes";
import { Usuario } from "src/usuario/schemas/usuario.schema";

@Schema()
export class Finca{
  @Prop({ required: true })
  nombre: string;

  @Prop()
  area: Number;

  @Prop()
  areaGanadera: Number;

  @Prop({
    default: TIPO_MEDIDAS.HECTAREA,
    enum: TIPO_MEDIDAS
  })
  tipoMedida: string;

  @Prop()
  abreviacion: string;

  @Prop({
    required: true,
    enum: TIPO_PROPOSITO
  })
  proposito: string;

  @Prop()
  direccion: string;

  @Prop()
  celular: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'
  })
  _propietario: Usuario;
  
  @Prop({
    default: [],
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}]
  })
  colaboradores: Usuario[]

}

export const FincaSchema = SchemaFactory.createForClass(Finca)
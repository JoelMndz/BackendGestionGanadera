import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { TIPO_MEDIDAS, TIPO_PROPOSITO } from "../constantes";
import { Usuario } from "src/usuario/schemas/usuario.schema";
import { ROL } from "src/usuario/constantes";

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
    type: [{
      _usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
      rol: {
        enum: ROL
      }
    }]
  })
  colaboradores: {
    _usuario: string,
    rol: string
  }[]

}

export const FincaSchema = SchemaFactory.createForClass(Finca)
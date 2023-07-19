import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ROLES } from "../constantes";

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombres: string;

  @Prop({ required: true })
  apellidos: string;

  @Prop({ required: true, unique: true, lowercase:true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  direccion: string;

  @Prop({ 
    required: true,
    enum:[ROLES.ADMINISTRADOR, ROLES.TRABAJADOR]
  })
  rol: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario)
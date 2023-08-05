import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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

  @Prop()
  telefono: string;

}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario)
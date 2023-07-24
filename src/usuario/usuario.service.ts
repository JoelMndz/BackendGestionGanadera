import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schemas/usuario.schema';
import { Model } from 'mongoose';
import { CrearUsuarioDto } from './dto/crearUsuario.dto';
import { ROL } from './constantes';
import {genSalt, hash} from "bcrypt";

@Injectable()
export class UsuarioService {
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>){}

  async buscarPorEmail(email:string){
    return await this.usuarioModel.findOne({email: email});
  }

  async crearAdministrador(usuario: CrearUsuarioDto){
    const existeUsuario = await this.buscarPorEmail(usuario.email);
    if(existeUsuario) throw new BadRequestException('El email ya esta registrado')
    usuario.password = await hash(usuario.password, 10);
    return await this.usuarioModel.create({...usuario,rol: ROL.ADMINISTRADOR})
  }
}

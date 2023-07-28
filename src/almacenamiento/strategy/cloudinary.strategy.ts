import { IAlmacenamientoStrategy } from "../almacenamiento.strategy";
import {v2 as cloudinary} from 'cloudinary'

export class CloudinaryStrategy implements IAlmacenamientoStrategy{
  
  constructor(){
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    })
  }

  async subirImagenEnBase64(base64: string): Promise<string> {
    const respuesta = await cloudinary.uploader.upload(`data:image/png;base64,${base64}`)
    return respuesta.url;
  }

}
import { Injectable } from '@nestjs/common';
import { CloudinaryStrategy } from 'src/almacenamiento/strategy/cloudinary.strategy';
import { CrearGanadoDto } from './dto/crearGanado.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ganado } from './schema/ganado.schema';
import { Model } from 'mongoose';

@Injectable()
export class GanadoService {
  constructor(
    private almacenamientoService: CloudinaryStrategy,
    @InjectModel(Ganado.name)
    private ganadoModel:Model<Ganado>, 
  ) { }

  async obtenerGanadoPorFinca(idFinca: string){
    return await this.ganadoModel.find({_finca:idFinca})
  }

  async crearGanado(ganado: CrearGanadoDto) {

    let fotoURL = null
    if(ganado.imagenBase64) fotoURL = await this.almacenamientoService.subirImagenEnBase64(ganado.imagenBase64);
    const pesos = ganado.peso ? [{
      fecha: Date.now(), 
      peso: ganado.peso,
      notas: 'Peso al momento de ingresar'
    }] : []
    
    const nuevoGanado = await this.ganadoModel.create({
      nombre: ganado.nombre,
      numero: ganado.numero,
      sexo: ganado.sexo,
      etapa: ganado.etapa,
      raza: ganado.raza,
      proposito: ganado.proposito,
      fechaNacimiento: ganado.fechaNacimiento,
      _padre: ganado._padre,
      _madre: ganado._madre,
      pesos,
      fotoURL: fotoURL,
      estado: ganado.estado,
      lote: ganado.lote,
      _finca: ganado._finca,
    });

    return nuevoGanado
  }
}

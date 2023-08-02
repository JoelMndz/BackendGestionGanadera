import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryStrategy } from 'src/almacenamiento/strategy/cloudinary.strategy';
import { CrearGanadoDto } from './dto/crearGanado.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ganado } from './schema/ganado.schema';
import { Model } from 'mongoose';
import { AgregarPesoDto } from './dto/agregarPeso.dto';
import { ActualizarGanadoDto } from './dto/actualizarGanado.dto';

@Injectable()
export class GanadoService {
  constructor(
    private almacenamientoService: CloudinaryStrategy,
    @InjectModel(Ganado.name)
    private ganadoModel: Model<Ganado>,
  ) { }

  async obtenerGanadoPorFinca(idFinca: string) {
    return await this.ganadoModel.find({ _finca: idFinca })
      .populate('_padre')
      .populate('_madre')
  }

  async crearGanado(ganado: CrearGanadoDto) {

    let fotoURL = null
    if (ganado.imagenBase64) fotoURL = await this.almacenamientoService.subirImagenEnBase64(ganado.imagenBase64);
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

    return await this.ganadoModel.findById(nuevoGanado._id)
      .populate('_padre')
      .populate('_madre')
  }

  async agregarPeso(pesoDto: AgregarPesoDto) {
    const ganado = await this.ganadoModel.findById(pesoDto._ganado);
    if (!ganado) throw new BadRequestException('El id del ganado no existe!');
    const nuevoPeso = {
      fecha: pesoDto.fecha,
      alimentacion: pesoDto.alimentacion,
      notas: pesoDto.notas ?? '',
      peso: pesoDto.peso
    };
    ganado.pesos.push(nuevoPeso);
    return await ganado.save();
  }

  async actualizarGanado(ganadoDto: ActualizarGanadoDto) {
    let fotoURL = null;
    const existeGanado = await this.ganadoModel.findById(ganadoDto._id)
    if (!existeGanado) throw new BadRequestException('El ganado no existe!')
    if (ganadoDto.imagenBase64) fotoURL = await this.almacenamientoService.subirImagenEnBase64(ganadoDto.imagenBase64);
    await this.ganadoModel.findByIdAndUpdate(existeGanado._id, {
      ...ganadoDto,
      fotoURL: fotoURL ?? existeGanado.fotoURL,
    })
    return await this.ganadoModel.findById(ganadoDto._id)
      .populate('_padre')
      .populate('_madre')
  }
}

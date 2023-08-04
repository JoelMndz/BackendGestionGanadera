import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CloudinaryStrategy } from 'src/almacenamiento/strategy/cloudinary.strategy';
import { CrearGanadoDto } from './dto/crearGanado.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ganado } from './schema/ganado.schema';
import { Model } from 'mongoose';
import { AgregarPesoDto } from './dto/agregarPeso.dto';
import { ActualizarGanadoDto } from './dto/actualizarGanado.dto';
import { ESTADO_GANADO } from './constantes';
import { ProduccionLeche } from './schema/produccion.leche.schema';
import { Finca } from 'src/finca/schemas/finca.schema';

@Injectable()
export class GanadoService {
  constructor(
    private almacenamientoService: CloudinaryStrategy,
    @InjectModel(Ganado.name)
    private ganadoModel: Model<Ganado>,
  ) { }

  async obtenerGanadoPorFinca(idFinca: string) {
    return await this.ganadoModel.find({ _finca: idFinca, estado:{
      $ne: ESTADO_GANADO.ELIMINADO
    }})
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

  async eliminarGanado(idGanado: string){    
    const ganadoEliminado = await this.ganadoModel.findByIdAndUpdate(idGanado,{estado: ESTADO_GANADO.ELIMINADO})    
    if(!ganadoEliminado) throw new BadRequestException('El animal no existe!')
    return ganadoEliminado;
  }
}


@Injectable()
export class ProduccionLecheService {
  constructor(
    @InjectModel(ProduccionLeche.name) private prodLecheModelo: Model<ProduccionLeche>,
    @InjectModel(Finca.name) private fincaModelo: Model<Finca>,
  ){};

  async nuevaProduccionLeche(fincaId:string, usuarioId: string, vacaId:string, litros:number, horario:string, fecha:Date) {
    const usuPermitido = this.fincaModelo.findOne({
      $and: [
        {_id: fincaId},
        {
          $or: [
            {'colaboradores._usuario._id': usuarioId},
            {_propietario: usuarioId}
          ]
        }
      ]
    });
        
    if(usuPermitido){
      return await this.prodLecheModelo.create({
        _finca : fincaId,
        _vaca: vacaId,
        horario,
        fecha,
        litros
      });
    }
    throw new UnauthorizedException("Finca no encontrada para el usuario autenticado")
  };

  async obtenerRegistrosLeches(fincaId:string, vacaId:string){    
    const resp = await this.prodLecheModelo.find({
      $and: [
        {'_finca': fincaId},
        {'_vaca': vacaId}
      ]
    });
    
    return resp.map((fila:any) => ({_id: fila._id, litros: fila.litros, fecha: fila.fecha, jornada: fila.horario}))
  }
}
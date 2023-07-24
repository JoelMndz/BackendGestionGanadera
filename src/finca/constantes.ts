import { ROL } from "src/usuario/constantes"

export enum TIPO_MEDIDAS {
  MANZANA= 'manzana',
  HECTAREA= 'hectarea',
  CUADRA= 'cuadra'
}

export enum TIPO_PROPOSITO {
  DOBLE_PROPOSITO='doble proposito',
  PRODUCCION_CARNE='produccion_carne',
  PRODUCCION_LECHE= 'produccion_leche',
  CRIA= 'cria'
}

export type GuardPayload={
  usuario:{
    _id: string,
    rol: ROL
  }
}
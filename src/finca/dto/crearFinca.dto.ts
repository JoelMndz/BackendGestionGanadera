import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TIPO_MEDIDAS, TIPO_PROPOSITO } from "../constantes";


export class CrearFincaDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsNumber()
  area: Number;

  @ApiProperty()
  @IsNumber()
  areaGanadera: Number;

  @ApiProperty()
  @IsEnum(TIPO_MEDIDAS)
  tipoMedida: string;

  @ApiProperty()
  @IsString()
  abreviacion: string;

  @ApiProperty()
  @IsEnum(TIPO_PROPOSITO)
  proposito: string;

  @ApiProperty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsString()
  celular: string;
}
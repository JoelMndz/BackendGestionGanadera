import { ApiProperty } from "@nestjs/swagger";
import { Transform,Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TIPO_MEDIDAS, TIPO_PROPOSITO } from "../constantes";


export class CrearFincaDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @Type(() => Number)
  @IsNumber()
  area: Number;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @Type(() => Number)
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
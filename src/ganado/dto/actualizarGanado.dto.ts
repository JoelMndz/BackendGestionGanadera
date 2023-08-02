import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBase64, IsBoolean, IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform,Type } from "class-transformer"
import { ESTADO_GANADO, SEXO } from "../constantes";

export class ActualizarGanadoDto{
  @ApiProperty()
  @IsString()
  _id: string

  @ApiProperty()
  @IsString()
  nombre: string

  @ApiProperty({enum: SEXO})
  @IsEnum(SEXO)
  sexo: string

  @ApiProperty()
  @IsString()
  numero: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  etapa: string
  
  @ApiProperty()
  @IsString()
  raza: string

  @ApiProperty()
  @IsString()
  proposito: string

  @ApiProperty()
  @IsDateString()
  fechaNacimiento: Date

  @ApiProperty()
  @IsBoolean()
  favorito: boolean

  @ApiProperty()
  @IsString()
  @IsOptional()
  _padre: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  _madre: string

  @ApiProperty({example:'ijiIHNUiynuiGUYGUbuy'})
  @IsBase64()
  @IsOptional()
  imagenBase64: string

  @ApiProperty()
  @IsEnum(ESTADO_GANADO)
  estado: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  lote: string
}
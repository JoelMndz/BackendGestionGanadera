import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBase64, IsBoolean, IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ESTADO_GANADO, SEXO } from "../constantes";

export class CrearGanadoDto{

  @ApiProperty()
  @IsString()
  nombre: string

  @ApiProperty({enum: SEXO})
  @IsEnum(SEXO)
  sexo: string

  @ApiProperty()
  @IsString()
  @IsOptional()
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
  @IsString()
  @IsOptional()
  _padre: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  _madre: string

  @ApiProperty()
  @IsNumber()
  peso: number;

  @ApiProperty({example:'ijiIHNUiynuiGUYGUbuy'})
  @IsBase64()
  @IsOptional()
  imagenBase64: string

  @ApiProperty()
  @IsEnum(ESTADO_GANADO)
  estado: string

  @ApiProperty()
  @IsString()
  _finca: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  lote: string
}
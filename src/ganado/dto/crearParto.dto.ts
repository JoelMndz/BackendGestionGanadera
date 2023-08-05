import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBase64, IsBoolean, IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform,Type } from "class-transformer"
import { ESTADO_GANADO, SEXO } from "../constantes";

export class CrearPartoDto{

  @ApiProperty()
  @IsDateString()
  fecha: Date

  @ApiProperty({enum: SEXO})
  @IsEnum(SEXO)
  sexo: string

  @ApiProperty()
  @IsBoolean()
  aborto: Boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  _hijo: string

  @ApiProperty()
  @IsString()
  _vaca: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  nota: string
}
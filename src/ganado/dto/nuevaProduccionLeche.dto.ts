import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsString } from "class-validator";
import { HORARIO_ORDENO } from "../constantes";

export class ProduccionLecheDto{
  @ApiProperty()
  @IsNumber()
  litros: number;

  @ApiProperty()
  @IsDateString()
  fecha: Date

  @ApiProperty()
  @IsEnum(HORARIO_ORDENO)
  horario: string

  @ApiProperty()
  @IsString()
  _finca: string

  @ApiProperty()
  @IsString()
  _vaca: string
}
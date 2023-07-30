import { ApiProperty } from "@nestjs/swagger"
import { Transform,Type } from "class-transformer"
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator"

export class AgregarPesoDto{

  @ApiProperty()
  @IsString()
  _ganado: String

  @ApiProperty()
  @IsDateString()
  fecha: Date

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @Type(() => Number)
  @IsNumber()
  peso: number

  @ApiProperty()
  @IsString()
  alimentacion: String

  @ApiProperty()
  @IsString()
  @IsOptional()
  notas: String
}
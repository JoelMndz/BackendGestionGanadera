import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator"
import { TIPO_INSEMINCACION } from "src/ganado/constantes"

export class CrearInseminacionDto{
  
  @ApiProperty({required : true})
  @IsDateString()
  fecha: Date

  @ApiProperty({required : true})
  @IsString()
  _vaca: String

  @ApiProperty({required : true})
  @IsString()
  _toro: String

  @ApiProperty({required : true})
  @IsEnum(TIPO_INSEMINCACION)
  tipo:string

  @ApiProperty({required : true})
  @IsString()
  numeroPajilla: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  nota: String

}
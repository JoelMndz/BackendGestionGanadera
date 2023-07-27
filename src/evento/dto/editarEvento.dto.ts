import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class EditarEventoDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _finca: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()  
  fecha: Number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  horaInicio: String;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  horaFinalizacion: String;

  @ApiProperty()
  @IsArray()
  participantes: [string] | [];

  @ApiProperty()
  @IsString()
  nota: string;
}
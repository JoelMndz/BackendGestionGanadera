import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ActualizarUsuarioDto{
  
  @ApiProperty()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsString()
  telefono: string;
}
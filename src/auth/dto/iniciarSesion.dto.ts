import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, min } from "class-validator";

export class IniciarSesionDto{

  @ApiProperty()
  @IsEmail()
  email:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string
  
}
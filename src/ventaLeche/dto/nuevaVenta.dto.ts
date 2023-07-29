import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NuevaVentaDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comprador: String;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()  
  fecha: String;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cantidadLitros: Number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  numeroPotrero: Number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  consumoTerneros: Number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  consumoCasa: Number;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class LitrosDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  venta: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  proyecto: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  terneras: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  otros: number
}

export class NuevaVentaDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comprador: String;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()  
  fecha: String;
  
  @ApiProperty({type: LitrosDto})
  @IsObject()
  litros: LitrosDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  vacasSacadas: Number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  novedades: String;
}
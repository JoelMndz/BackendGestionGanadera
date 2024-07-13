import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RestablecerPasswordDto{
  
  @ApiProperty()
  @IsString()
  email: string;
}
import { ApiProperty  } from "@nestjs/swagger";

export class UsuarioResponse{
  @ApiProperty()
  _id: string;
  @ApiProperty()
  nombres: string;
  @ApiProperty()
  apellidos: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  direccion: string;
}

export class IniciarSesionResponse{

  @ApiProperty({type: String, default:'LJNIUhuyGUYBUYG'})
  token:string;

  @ApiProperty({type:UsuarioResponse})
  usuario: UsuarioResponse
}

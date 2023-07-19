import { Controller, Get } from '@nestjs/common';

@Controller('finca')
export class FincaController {
  
  @Get()
  obtenerTodo(){
    return [];
  }

}

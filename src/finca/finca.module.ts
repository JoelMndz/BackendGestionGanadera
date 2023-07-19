import { Module } from '@nestjs/common';
import { FincaController } from './finca.controller';
import { FincaService } from './finca.service';

@Module({
  controllers: [FincaController],
  providers: [FincaService]
})
export class FincaModule {}

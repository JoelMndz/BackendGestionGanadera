import { Module } from '@nestjs/common';
import { FincaController } from './finca.controller';
import { FincaService } from './finca.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Finca, FincaSchema } from './schemas/finca.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AlertaModule } from 'src/alerta/alerta.module';

@Module({
  imports: [
    AuthModule,
    AlertaModule,
    MongooseModule.forFeature([{name: Finca.name, schema: FincaSchema}])],
  controllers: [FincaController],
  providers: [FincaService],
  exports: [FincaService],
})
export class FincaModule {}

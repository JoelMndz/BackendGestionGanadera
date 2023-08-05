import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Alerta, AlertaSchema } from './schema/alerta.schema';
import { AlertaService } from './alerta.service';
import { AlertaController } from './alerta.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([{name: Alerta.name, schema:AlertaSchema}])
  ],
  providers:[AlertaService],
  exports:[AlertaService],
  controllers: [AlertaController]
})
export class AlertaModule {}

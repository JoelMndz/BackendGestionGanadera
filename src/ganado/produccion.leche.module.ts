import { Module } from '@nestjs/common';
import { ProduccionLecheController } from './ganado.controller';
import { ProduccionLecheService } from './ganado.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProduccionLeche, ProduccionLecheSchema } from './schema/produccion.leche.schema';
import { Finca, FincaSchema } from 'src/finca/schemas/finca.schema';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([
      {name: ProduccionLeche.name, schema: ProduccionLecheSchema},
      {name: Finca.name, schema: FincaSchema},
    ])
  ],
  controllers: [ProduccionLecheController],
  providers: [ProduccionLecheService]
})
export class ProduccionLecheModule {}

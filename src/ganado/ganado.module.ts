import { Module } from '@nestjs/common';
import { GanadoController } from './ganado.controller';
import { GanadoService } from './ganado.service';
import { AlmacenamientoModule } from 'src/almacenamiento/almacenamiento.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Ganado, GanadoSchema } from './schema/ganado.schema';
import { AuthModule } from 'src/auth/auth.module';
import { Finca, FincaSchema } from 'src/finca/schemas/finca.schema';
import { Parto, PartoSchema } from './schema/parto.schema';

@Module({
  imports:[
    AuthModule,
    AlmacenamientoModule,
    MongooseModule.forFeature([
      {name: Ganado.name, schema: GanadoSchema},
      {name: Finca.name, schema: FincaSchema},
      {name: Parto.name, schema: PartoSchema}
    ])
  ],
  controllers: [GanadoController],
  providers: [GanadoService]
})
export class GanadoModule {
  
}

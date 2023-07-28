import { Module } from '@nestjs/common';
import { GanadoController } from './ganado.controller';
import { GanadoService } from './ganado.service';
import { AlmacenamientoModule } from 'src/almacenamiento/almacenamiento.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Ganado, GanadoSchema } from './schema/ganado.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    AlmacenamientoModule,
    MongooseModule.forFeature([
      {name: Ganado.name, schema: GanadoSchema}
    ])
  ],
  controllers: [GanadoController],
  providers: [GanadoService]
})
export class GanadoModule {
  
}

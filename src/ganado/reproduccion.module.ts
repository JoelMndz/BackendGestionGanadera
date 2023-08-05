import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Inseminacion, InsemincacionSchema } from "./schema/inseminacion.schema";
import { InseminacionController } from "./reproduccion.controller";
import { InseminacionService } from "./reproduccion.service";
import { Ganado, GanadoSchema } from "./schema/ganado.schema";

@Module({
  imports: [  
    AuthModule,
    MongooseModule.forFeature([
      { name: Inseminacion.name, schema: InsemincacionSchema },
      { name: Ganado.name, schema: GanadoSchema }
    ])
  ],
  controllers: [
    InseminacionController,
  ],
  providers: [
    InseminacionService,
  ]
})

export class ReproduccionModulo {}
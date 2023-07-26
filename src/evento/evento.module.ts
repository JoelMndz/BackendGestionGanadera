import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { Evento, EventoSchema } from "./schema/evento.shema";
import { EventoController } from "./evento.controller";
import { EventoService } from "./evento.service";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: Evento.name, schema: EventoSchema}])
  ],
  controllers: [EventoController],
  providers: [EventoService]
})

export class EventoModule {};
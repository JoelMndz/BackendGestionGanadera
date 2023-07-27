import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { Evento, EventoSchema } from "./schema/evento.shema";
import { EventoController } from "./evento.controller";
import { EventoService } from "./evento.service";
import { Finca, FincaSchema } from "src/finca/schemas/finca.schema";
import { FincaService } from "src/finca/finca.service";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: Evento.name, schema: EventoSchema}]),
    MongooseModule.forFeature([{name: Finca.name, schema: FincaSchema}]),
  ],
  controllers: [EventoController],
  providers: [EventoService, FincaService]
})

export class EventoModule {};
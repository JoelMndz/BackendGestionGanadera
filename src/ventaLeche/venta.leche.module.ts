import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { VentaLeche, VentaLecheSchema } from "./schema/venta.leche.schema";
import { VentaLecheService } from "./venta.leche.service";
import { Finca, FincaSchema } from "src/finca/schemas/finca.schema";
import { FincaService } from "src/finca/finca.service";
import { VentaLecheController } from "./venta.leche.controller";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: VentaLeche.name, schema: VentaLecheSchema}]),
    MongooseModule.forFeature([{name: Finca.name, schema: FincaSchema}]),
  ],
  controllers: [VentaLecheController],
  providers: [VentaLecheService, FincaService]
})

export class VentaLecheModule {};
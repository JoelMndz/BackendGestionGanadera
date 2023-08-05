import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FincaModule } from './finca/finca.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EventoModule } from './evento/evento.module';
import { VentaLecheModule } from './ventaLeche/venta.leche.module';
import { AlmacenamientoModule } from './almacenamiento/almacenamiento.module';
import { GanadoModule } from './ganado/ganado.module';
import { ProduccionLecheModule } from './ganado/produccion.leche.module';
import { ReproduccionModulo } from './ganado/reproduccion.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsuarioModule,
    FincaModule,
    EventoModule,
    VentaLecheModule,
    AlmacenamientoModule,
    GanadoModule,
    ProduccionLecheModule,
    ReproduccionModulo,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FincaModule } from './finca/finca.module';
import { FincaController } from './finca/finca.controller';
import { FincaService } from './finca/finca.service';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [FincaModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), AuthModule, UsuarioModule],
  controllers: [AppController, FincaController],
  providers: [AppService, FincaService],
})

export class AppModule { }

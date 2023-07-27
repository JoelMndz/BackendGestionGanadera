import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './schemas/usuario.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '..', '..', '.env')
    }),
    MongooseModule.forFeature([{name: Usuario.name, schema: UsuarioSchema}]),
    MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  })],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})

export class UsuarioModule {}
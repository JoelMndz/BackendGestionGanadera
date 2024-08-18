import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { FincaService } from 'src/finca/finca.service';
import { FincaModule } from 'src/finca/finca.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuarioModule,
    forwardRef(() => FincaModule),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {expiresIn: '365d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard]
})
export class AuthModule {}

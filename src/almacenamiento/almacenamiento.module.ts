import { Module } from '@nestjs/common';
import { CloudinaryStrategy } from './strategy/cloudinary.strategy';

@Module({
  providers:[CloudinaryStrategy],
  exports:[CloudinaryStrategy]
})
export class AlmacenamientoModule {}

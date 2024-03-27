import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService, JwtService],
})
export class ArtistModule {}

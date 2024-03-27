import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrackController],
  providers: [TrackService, JwtService],
})
export class TrackModule {}

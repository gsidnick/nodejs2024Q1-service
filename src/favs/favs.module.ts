import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FavsController],
  providers: [FavsService, JwtService],
})
export class FavsModule {}

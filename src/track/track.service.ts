import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    return this.prisma.track.findUnique({ where: { id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.prisma.track.update({ where: { id }, data: updateTrackDto });
  }

  async remove(id: string) {
    return this.prisma.track.delete({ where: { id } });
  }
}

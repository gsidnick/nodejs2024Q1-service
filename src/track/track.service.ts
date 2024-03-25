import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import database from '../database';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    return database.createTrack(createTrackDto);
  }

  findAll() {
    return database.getTracks();
  }

  findOne(id: string) {
    return database.getTrack(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return database.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    database.deleteTrackFromFavorites(id);
    database.deleteTrack(id);
  }
}

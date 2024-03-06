import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import database from '../database';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    return database.createArtist(createArtistDto);
  }

  findAll(): Artist[] {
    return database.getArtists();
  }

  findOne(id: string) {
    return database.getArtist(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return database.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    database.deleteArtist(id);
  }
}

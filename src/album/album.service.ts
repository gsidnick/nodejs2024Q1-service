import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import database from '../database';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    return database.createAlbum(createAlbumDto);
  }

  findAll() {
    return database.getAlbums();
  }

  findOne(id: string) {
    return database.getAlbum(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return database.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    database.deleteAlbum(id);
  }
}

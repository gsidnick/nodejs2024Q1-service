import { Injectable } from '@nestjs/common';
import { Track } from 'src/track/interfaces/track.interface';
import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import database from '../database';

@Injectable()
export class FavsService {
  findAll() {
    return database.getFavorites();
  }

  addTrack(id: string): Track | undefined {
    return database.addTrackToFavs(id);
  }

  removeTrack(id: string): Track | undefined {
    return database.removeTrackFromFavs(id);
  }

  addAlbum(id: string): Album | undefined {
    return database.addAlbumToFavs(id);
  }

  removeAlbum(id: string): Album | undefined {
    return database.removeAlbumFromFavs(id);
  }

  addArtist(id: string): Artist | undefined {
    return database.addArtistToFavs(id);
  }

  removeArtist(id: string): Artist | undefined {
    return database.removeArtistFromFavs(id);
  }
}

import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favs {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];

  constructor(favs: Partial<Favs>) {
    Object.assign(this, favs);
  }
}

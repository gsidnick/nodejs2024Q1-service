import { Artist } from '../../artist/interfaces/artist.interface';
import { Track } from '../../track/interfaces/track.interface';
import { Album } from '../../album/interfaces/album.interface';

export interface Favorites {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}

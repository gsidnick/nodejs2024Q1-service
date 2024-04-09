export class Track {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(track: Partial<Track>) {
    Object.assign(this, track);
  }
}

export class Album {
  name: string;
  year: number;
  artistId: string | null;

  constructor(album: Partial<Album>) {
    Object.assign(this, album);
  }
}

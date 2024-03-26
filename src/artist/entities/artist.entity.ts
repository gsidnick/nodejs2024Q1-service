export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(artist: Partial<Artist>) {
    Object.assign(this, artist);
  }
}

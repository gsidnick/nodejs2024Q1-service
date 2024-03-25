import { CreateAlbumDto as ICreateAlbumDto } from '../interfaces/album.interface';

export class CreateAlbumDto implements ICreateAlbumDto {
  name: string;
  year: number;
  artistId: string;
}

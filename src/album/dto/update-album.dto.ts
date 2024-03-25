import { UpdateAlbumDto as IUpdateAlbumDto } from '../interfaces/album.interface';

export class UpdateAlbumDto implements IUpdateAlbumDto {
  name: string;
  year: number;
  artistId: string;
}

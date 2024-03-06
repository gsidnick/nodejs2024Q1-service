import { CreateArtistDto as ICreateArtistDto } from '../interfaces/artist.interface';

export class CreateArtistDto implements ICreateArtistDto {
  name: string;
  grammy: boolean;
}

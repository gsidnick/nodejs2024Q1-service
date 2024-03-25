import { CreateTrackDto as ICreateTrackDto } from '../interfaces/track.interface';

export class CreateTrackDto implements ICreateTrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

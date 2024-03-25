import { UpdateTrackDto as IUpdateTrackDto } from '../interfaces/track.interface';

export class UpdateTrackDto implements IUpdateTrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

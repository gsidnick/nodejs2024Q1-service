import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UpdateTrackDto as IUpdateTrackDto } from '../interfaces/track.interface';

export class UpdateTrackDto implements IUpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsUUID()
  artistId: string | null;
  @IsOptional()
  @IsUUID()
  albumId: string | null;
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateTrackDto as ICreateTrackDto } from '../interfaces/track.interface';

export class CreateTrackDto implements ICreateTrackDto {
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

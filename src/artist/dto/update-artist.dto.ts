import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UpdateArtistDto as IUpdateArtistDto } from '../interfaces/artist.interface';

export class UpdateArtistDto implements IUpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

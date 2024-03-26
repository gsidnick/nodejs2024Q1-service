import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateArtistDto as ICreateArtistDto } from '../interfaces/artist.interface';

export class CreateArtistDto implements ICreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateAlbumDto as ICreateAlbumDto } from '../interfaces/album.interface';

export class CreateAlbumDto implements ICreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}

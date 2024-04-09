import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UpdateAlbumDto as IUpdateAlbumDto } from '../interfaces/album.interface';

export class UpdateAlbumDto implements IUpdateAlbumDto {
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

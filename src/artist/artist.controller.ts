import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { isBoolean, isString, isUUID } from 'class-validator';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto, @Res() res: Response) {
    if (
      !(
        Object.keys(createArtistDto).length === 2 &&
        'name' in createArtistDto &&
        'grammy' in createArtistDto
      ) ||
      !isString(createArtistDto.name) ||
      !isBoolean(createArtistDto.grammy)
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = this.artistService.create(createArtistDto);
    res.status(HttpStatus.CREATED).json(artist).send();
  }

  @Get()
  findAll(@Res() res: Response) {
    const artists = this.artistService.findAll();
    res.status(HttpStatus.OK).json(artists).send();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = this.artistService.findOne(id);

    if (!artist) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.OK).json(artist).send();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    if (
      !(
        Object.keys(updateArtistDto).length === 2 &&
        'name' in updateArtistDto &&
        'grammy' in updateArtistDto
      ) ||
      !isString(updateArtistDto.name) ||
      !isBoolean(updateArtistDto.grammy)
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = this.artistService.findOne(id);

    if (!artist) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    const updatedArtist = this.artistService.update(id, updateArtistDto);
    res.status(HttpStatus.OK).json(updatedArtist).send();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = this.artistService.findOne(id);

    if (!artist) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    this.artistService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}

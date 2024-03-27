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
  async create(@Body() createArtistDto: CreateArtistDto, @Res() res: Response) {
    if (
      !(
        Object.keys(createArtistDto).length === 2 &&
        'name' in createArtistDto &&
        'grammy' in createArtistDto
      ) ||
      !isString(createArtistDto.name) ||
      !isBoolean(createArtistDto.grammy)
    ) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const artist = await this.artistService.create(createArtistDto);

    res.status(HttpStatus.CREATED).json(artist).send();
  }

  @Get()
  async findAll(@Res() res: Response) {
    const artists = await this.artistService.findAll();

    res.status(HttpStatus.OK).json(artists).send();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const artist = await this.artistService.findOne(id);

    if (!artist) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    res.status(HttpStatus.OK).json(artist).send();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
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

    const artist = await this.artistService.findOne(id);

    if (!artist) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    const updatedArtist = await this.artistService.update(id, updateArtistDto);

    res.status(HttpStatus.OK).json(updatedArtist).send();
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const artist = await this.artistService.findOne(id);

    if (!artist) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    await this.artistService.remove(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}

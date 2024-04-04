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
import { isNumber, isString, isUUID } from 'class-validator';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response) {
    if (
      !(
        Object.keys(createTrackDto).length === 4 &&
        'name' in createTrackDto &&
        'artistId' in createTrackDto &&
        'albumId' in createTrackDto &&
        'duration' in createTrackDto
      ) ||
      !isString(createTrackDto.name) ||
      !(
        isString(createTrackDto.artistId) || createTrackDto.artistId === null
      ) ||
      !(isString(createTrackDto.albumId) || createTrackDto.albumId === null) ||
      !isNumber(createTrackDto.duration)
    ) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const track = await this.trackService.create(createTrackDto);

    res.status(HttpStatus.CREATED).json(track).send();
  }

  @Get()
  async findAll(@Res() res: Response) {
    const tracks = await this.trackService.findAll();

    res.status(HttpStatus.OK).json(tracks).send();
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

    const track = await this.trackService.findOne(id);

    if (!track) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    res.status(HttpStatus.OK).json(track).send();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
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
        Object.keys(updateTrackDto).length === 4 &&
        'name' in updateTrackDto &&
        'artistId' in updateTrackDto &&
        'albumId' in updateTrackDto &&
        'duration' in updateTrackDto
      ) ||
      !isString(updateTrackDto.name) ||
      !(
        isString(updateTrackDto.artistId) || updateTrackDto.artistId === null
      ) ||
      !(isString(updateTrackDto.albumId) || updateTrackDto.albumId === null) ||
      !isNumber(updateTrackDto.duration)
    ) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const track = await this.trackService.findOne(id);

    if (!track) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    const updatedTrack = await this.trackService.update(id, updateTrackDto);

    res.status(HttpStatus.OK).json(updatedTrack).send();
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

    const track = await this.trackService.findOne(id);

    if (!track) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    await this.trackService.remove(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}

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
  create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response) {
    if (
      !(Object.keys(createTrackDto).length === 4) ||
      createTrackDto.name === null
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = this.trackService.create(createTrackDto);
    res.status(HttpStatus.CREATED).json(track).send();
  }

  @Get()
  findAll(@Res() res: Response) {
    const tracks = this.trackService.findAll();
    res.status(HttpStatus.OK).json(tracks).send();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = this.trackService.findOne(id);

    if (!track) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.OK).json(track).send();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
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
      !isNumber(updateTrackDto.duration)
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = this.trackService.findOne(id);

    if (!track) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    const updatedTrack = this.trackService.update(id, updateTrackDto);
    res.status(HttpStatus.OK).json(updatedTrack).send();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = this.trackService.findOne(id);

    if (!track) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    this.trackService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}

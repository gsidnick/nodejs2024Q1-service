import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { isUUID } from 'class-validator';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll(@Res() res: Response) {
    const favorites = this.favsService.findAll();
    res.status(HttpStatus.OK).json(favorites).send();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = this.favsService.addTrack(id);

    if (!track) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    res.status(HttpStatus.CREATED).send();
  }

  @Delete('track/:id')
  removeTrack(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = this.favsService.removeTrack(id);

    if (!track) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = this.favsService.addAlbum(id);

    if (!album) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    res.status(HttpStatus.CREATED).send();
  }

  @Delete('album/:id')
  removeAlbum(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = this.favsService.removeAlbum(id);

    if (!album) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = this.favsService.addArtist(id);

    if (!artist) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    res.status(HttpStatus.CREATED).send();
  }

  @Delete('artist/:id')
  removeArtist(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = this.favsService.removeArtist(id);

    if (!artist) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }
}

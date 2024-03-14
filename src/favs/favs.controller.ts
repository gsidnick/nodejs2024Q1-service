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
  async findAll(@Res() res: Response) {
    const favorites = await this.favsService.findAll();

    res.status(HttpStatus.OK).json(favorites).send();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const track = await this.favsService.addTrack(id);

    if (!track) {
      const error = {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable entity',
      };

      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error).send();
      return;
    }

    res.status(HttpStatus.CREATED).json(track).send();
  }

  @Delete('track/:id')
  async removeTrack(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const track = await this.favsService.removeTrack(id);

    if (!track) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const album = await this.favsService.addAlbum(id);

    if (!album) {
      const error = {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable entity',
      };

      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error).send();
      return;
    }

    res.status(HttpStatus.CREATED).json(album).send();
  }

  @Delete('album/:id')
  async removeAlbum(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const album = await this.favsService.removeAlbum(id);

    if (!album) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const artist = await this.favsService.addArtist(id);

    if (!artist) {
      const error = {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable entity',
      };

      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error).send();
      return;
    }

    res.status(HttpStatus.CREATED).json(artist).send();
  }

  @Delete('artist/:id')
  async removeArtist(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const artist = await this.favsService.removeArtist(id);

    if (!artist) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }
}

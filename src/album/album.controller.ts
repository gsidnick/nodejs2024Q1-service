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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto, @Res() res: Response) {
    if (
      !(
        Object.keys(createAlbumDto).length === 3 &&
        'name' in createAlbumDto &&
        'year' in createAlbumDto &&
        'artistId' in createAlbumDto
      ) ||
      !isString(createAlbumDto.name) ||
      !isNumber(createAlbumDto.year) ||
      !(isString(createAlbumDto.artistId) || createAlbumDto.artistId === null)
    ) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const album = await this.albumService.create(createAlbumDto);
    res.status(HttpStatus.CREATED).json(album).send();
  }

  @Get()
  async findAll(@Res() res: Response) {
    const albums = await this.albumService.findAll();

    res.status(HttpStatus.OK).json(albums).send();
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

    const album = await this.albumService.findOne(id);

    if (!album) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    res.status(HttpStatus.OK).json(album).send();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
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
        Object.keys(updateAlbumDto).length === 3 &&
        'name' in updateAlbumDto &&
        'year' in updateAlbumDto &&
        'artistId' in updateAlbumDto
      ) ||
      !isString(updateAlbumDto.name) ||
      !isNumber(updateAlbumDto.year) ||
      !(isString(updateAlbumDto.artistId) || updateAlbumDto.artistId === null)
    ) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const album = await this.albumService.findOne(id);

    if (!album) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    const updatedAlbum = await this.albumService.update(id, updateAlbumDto);
    res.status(HttpStatus.OK).json(updatedAlbum).send();
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

    const album = await this.albumService.findOne(id);

    if (!album) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    await this.albumService.remove(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}

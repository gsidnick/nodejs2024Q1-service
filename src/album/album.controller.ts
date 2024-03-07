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
import { isString, isUUID } from 'class-validator';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto, @Res() res: Response) {
    if (
      !(Object.keys(createAlbumDto).length === 3) ||
      createAlbumDto.name === null
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = this.albumService.create(createAlbumDto);
    res.status(HttpStatus.CREATED).json(album).send();
  }

  @Get()
  findAll(@Res() res: Response) {
    const albums = this.albumService.findAll();
    res.status(HttpStatus.OK).json(albums).send();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = this.albumService.findOne(id);

    if (!album) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.OK).json(album).send();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    if (
      !(Object.keys(updateAlbumDto).length === 3 && 'name' in updateAlbumDto) ||
      !isString(updateAlbumDto.name)
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = this.albumService.findOne(id);

    if (!album) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    const updatedAlbum = this.albumService.update(id, updateAlbumDto);
    res.status(HttpStatus.OK).json(updatedAlbum).send();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = this.albumService.findOne(id);

    if (!album) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    this.albumService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}

import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Favs } from './entities/favs.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Favs> {
    const artistsData = await this.prisma.favorite.findMany({
      select: {
        artistId: true,
      },
      where: {
        artistId: { not: null },
      },
    });

    const artistIds = artistsData.map((artist) => artist.artistId);

    const albumsData = await this.prisma.favorite.findMany({
      select: {
        albumId: true,
      },
      where: {
        albumId: { not: null },
      },
    });

    const albumIds = albumsData.map((album) => album.albumId);

    const tracksData = await this.prisma.favorite.findMany({
      select: {
        trackId: true,
      },
      where: {
        trackId: { not: null },
      },
    });

    const trackIds = tracksData.map((track) => track.trackId);

    const artists = await this.prisma.artist.findMany({
      where: { id: { in: artistIds } },
    });
    const albums = await this.prisma.album.findMany({
      where: { id: { in: albumIds } },
    });
    const tracks = await this.prisma.track.findMany({
      where: { id: { in: trackIds } },
    });

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    const trackFav = await this.prisma.favorite.findUnique({
      where: { trackId: id },
    });

    if (!track || trackFav) {
      throw new UnprocessableEntityException();
    }

    await this.prisma.favorite.create({ data: { trackId: id } });

    return track;
  }

  async removeTrack(id: string): Promise<void> {
    const track = await this.prisma.favorite.findUnique({
      where: { trackId: id },
    });

    if (!track) {
      throw new NotFoundException();
    }

    await this.prisma.favorite.delete({ where: { trackId: id } });
  }

  async addAlbum(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    const albumFav = await this.prisma.favorite.findUnique({
      where: { albumId: id },
    });

    if (!album || albumFav) {
      throw new UnprocessableEntityException();
    }

    await this.prisma.favorite.create({ data: { albumId: id } });

    return album;
  }

  async removeAlbum(id: string): Promise<void> {
    const album = await this.prisma.favorite.findUnique({
      where: { albumId: id },
    });

    if (!album) {
      throw new NotFoundException();
    }

    await this.prisma.favorite.delete({ where: { albumId: id } });
  }

  async addArtist(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    const artistFav = await this.prisma.favorite.findUnique({
      where: { artistId: id },
    });

    if (!artist || artistFav) {
      throw new UnprocessableEntityException();
    }

    await this.prisma.favorite.create({ data: { artistId: id } });

    return artist;
  }

  async removeArtist(id: string): Promise<void> {
    const artist = await this.prisma.favorite.findUnique({
      where: { artistId: id },
    });

    if (!artist) {
      throw new NotFoundException();
    }

    await this.prisma.favorite.delete({ where: { artistId: id } });
  }
}

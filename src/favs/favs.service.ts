import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
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

  async addTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    const trackFav = await this.prisma.favorite.findUnique({
      where: { trackId: id },
    });

    if (track && !trackFav) {
      await this.prisma.favorite.create({ data: { trackId: id } });
    }

    return track;
  }

  async removeTrack(id: string) {
    const track = await this.prisma.favorite.findUnique({
      where: { trackId: id },
    });

    if (track) {
      await this.prisma.favorite.delete({ where: { trackId: id } });
    }

    return track;
  }

  async addAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    const albumFav = await this.prisma.favorite.findUnique({
      where: { albumId: id },
    });

    if (album && !albumFav) {
      await this.prisma.favorite.create({ data: { albumId: id } });
    }

    return album;
  }

  async removeAlbum(id: string) {
    const album = await this.prisma.favorite.findUnique({
      where: { albumId: id },
    });

    if (album) {
      await this.prisma.favorite.delete({ where: { albumId: id } });
    }

    return album;
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    const artistFav = await this.prisma.favorite.findUnique({
      where: { artistId: id },
    });

    if (artist && !artistFav) {
      await this.prisma.favorite.create({ data: { artistId: id } });
    }

    return artist;
  }

  async removeArtist(id: string) {
    const artist = await this.prisma.favorite.findUnique({
      where: { artistId: id },
    });

    if (artist) {
      await this.prisma.favorite.delete({ where: { artistId: id } });
    }

    return artist;
  }
}

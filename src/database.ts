import { v4 as uuid4 } from 'uuid';
import { User } from './user/interfaces/user.interface';
import { Artist } from './artist/interfaces/artist.interface';
import { Track } from './track/interfaces/track.interface';
import { Album } from './album/interfaces/album.interface';
import { Favorites } from './favs/interfaces/favs.interface';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UpdateUserDto } from './user/dto/update-user.dto';
import { CreateArtistDto } from './artist/dto/create-artist.dto';
import { UpdateArtistDto } from './artist/dto/update-artist.dto';
import { CreateTrackDto } from './track/dto/create-track.dto';
import { UpdateTrackDto } from './track/dto/update-track.dto';
import { CreateAlbumDto } from './album/dto/create-album.dto';
import { UpdateAlbumDto } from './album/dto/update-album.dto';

interface DB {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}

export class Database {
  static instance: Database;

  private db: DB;

  constructor() {
    this.db = {
      users: [],
      artists: [],
      tracks: [],
      albums: [],
      favorites: { albums: [], artists: [], tracks: [] },
    };
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getUsers(): User[] {
    return this.db.users;
  }

  public getUser(id: string): User {
    return this.db.users.find((user) => user.id === id);
  }

  public createUser(createUserDto: CreateUserDto): User {
    const date = Date.now();
    const user: User = {
      id: uuid4(),
      ...createUserDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    this.db.users = [...this.db.users, user];

    const userForResponse = { ...user };
    delete userForResponse.password;
    return userForResponse;
  }

  public updateUser(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.db.users.find((user) => user.id === id);
    const index = this.db.users.findIndex((user) => user.id === id);
    const updatedUser: User = {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.db.users[index] = updatedUser;

    const userForResponse = { ...updatedUser };
    delete userForResponse.password;
    return userForResponse;
  }

  public deleteUser(id: string): User {
    const index = this.db.users.findIndex((user) => user.id === id);
    const user = this.db.users[index];
    this.db.users.splice(index, 1);
    return user;
  }

  public getArtists(): Artist[] {
    return this.db.artists;
  }

  public getArtist(id: string): Artist {
    return this.db.artists.find((artist) => artist.id === id);
  }

  public createArtist(createArtistDto: CreateArtistDto): Artist {
    const artist: Artist = {
      id: uuid4(),
      ...createArtistDto,
    };

    this.db.artists = [...this.db.artists, artist];

    return artist;
  }

  public updateArtist(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.getArtist(id);
    const index = this.db.artists.findIndex((artist) => artist.id === id);
    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    this.db.artists[index] = updatedArtist;

    return updatedArtist;
  }

  public deleteArtist(id: string): Artist {
    const index = this.db.artists.findIndex((artist) => artist.id === id);
    const artist = this.db.artists[index];
    this.db.artists.splice(index, 1);
    return artist;
  }

  public deleteArtistIdInTracks(id: string): void {
    const tracks = this.db.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });

    this.db.tracks = tracks;
  }

  public deleteArtistIdInAlbums(id: string): void {
    const albums = this.db.albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });

    this.db.albums = albums;
  }

  public deleteArtistFromFavorites(id: string): void {
    const index = this.db.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      return;
    }

    this.db.favorites.artists.splice(index, 1);
  }

  public getTracks(): Track[] {
    return this.db.tracks;
  }

  public getTrack(id: string): Track {
    return this.db.tracks.find((track) => track.id === id);
  }

  public createTrack(createTrackDto: CreateTrackDto): Track {
    const track: Track = {
      id: uuid4(),
      ...createTrackDto,
    };

    this.db.tracks = [...this.db.tracks, track];

    return track;
  }

  public updateTrack(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.getTrack(id);
    const index = this.db.tracks.findIndex((track) => track.id === id);
    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };

    this.db.tracks[index] = updatedTrack;

    return updatedTrack;
  }

  public deleteTrack(id: string): Track {
    const index = this.db.tracks.findIndex((track) => track.id === id);
    const track = this.db.tracks[index];
    this.db.tracks.splice(index, 1);
    return track;
  }

  public deleteTrackFromFavorites(id: string): void {
    const index = this.db.favorites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      return;
    }

    this.db.favorites.tracks.splice(index, 1);
  }

  public getAlbums(): Album[] {
    return this.db.albums;
  }

  public getAlbum(id: string): Album {
    return this.db.albums.find((album) => album.id === id);
  }

  public createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const album: Album = {
      id: uuid4(),
      ...createAlbumDto,
    };

    this.db.albums = [...this.db.albums, album];

    return album;
  }
  public updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.getAlbum(id);
    const index = this.db.albums.findIndex((album) => album.id === id);
    const updatedAlbum: Album = {
      ...album,
      ...updateAlbumDto,
    };

    this.db.albums[index] = updatedAlbum;

    return updatedAlbum;
  }

  public deleteAlbum(id: string): Album {
    const index = this.db.albums.findIndex((album) => album.id === id);
    const album = this.db.albums[index];
    this.db.albums.splice(index, 1);
    return album;
  }

  public deleteAlbumIdInTracks(id: string): void {
    const tracks = this.db.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });

    this.db.tracks = tracks;
  }

  public deleteAlbumFromFavorites(id: string): void {
    const index = this.db.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      return;
    }

    this.db.favorites.albums.splice(index, 1);
  }

  public getFavorites(): Favorites {
    return this.db.favorites;
  }

  public addTrackToFavs(id: string): Track | undefined {
    const track = this.getTrack(id);

    if (track) {
      this.db.favorites.tracks = [...this.db.favorites.tracks, track];
    }

    return track;
  }

  public removeTrackFromFavs(id: string): Track | undefined {
    const index = this.db.favorites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      return undefined;
    }

    const track = this.db.favorites.tracks[index];
    this.db.favorites.tracks.splice(index, 1);

    return track;
  }

  public addAlbumToFavs(id: string): Album | undefined {
    const album = this.getAlbum(id);

    if (album) {
      this.db.favorites.albums = [...this.db.favorites.albums, album];
    }

    return album;
  }

  public removeAlbumFromFavs(id: string): Album | undefined {
    const index = this.db.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      return undefined;
    }

    const album = this.db.favorites.albums[index];
    this.db.favorites.albums.splice(index, 1);

    return album;
  }

  public addArtistToFavs(id: string): Artist | undefined {
    const artist = this.getArtist(id);

    if (artist) {
      this.db.favorites.artists = [...this.db.favorites.artists, artist];
    }

    return artist;
  }

  public removeArtistFromFavs(id: string): Artist | undefined {
    const index = this.db.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      return undefined;
    }

    const artist = this.db.favorites.artists[index];
    this.db.favorites.artists.splice(index, 1);

    return artist;
  }
}

export default Database.getInstance();

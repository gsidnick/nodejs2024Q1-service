import { v4 as uuid4 } from 'uuid';
import { User } from './user/interfaces/user.interface';
import { Artist } from './artist/interfaces/artist.interface';
import { Track } from './track/interfaces/track.interface';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UpdateUserDto } from './user/dto/update-user.dto';
import { CreateArtistDto } from './artist/dto/create-artist.dto';
import { UpdateArtistDto } from './artist/dto/update-artist.dto';
import { CreateTrackDto } from './track/dto/create-track.dto';
import { UpdateTrackDto } from './track/dto/update-track.dto';

interface DB {
  users: User[];
  artists: Artist[];
  tracks: Track[];
}

export class Database {
  static instance: Database;

  private db: DB;

  constructor() {
    this.db = {
      users: [],
      artists: [],
      tracks: [],
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
    const user = this.getUser(id);
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
}

export default Database.getInstance();
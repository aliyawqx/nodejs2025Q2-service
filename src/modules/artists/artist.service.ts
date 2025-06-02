import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto.js';
import { UpdateArtistDto } from './dto/update-artist.dto.js';
import { Artist } from './interfaces/artist.interface.js';
import { AlbumService } from '../albums/album.service.js';
import { TrackService } from '../tracks/track.service.js';
import { FavoritesService } from '../favorites/favorites.service.js';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return undefined;

    this.artists[artistIndex] = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };

    return this.artists[artistIndex];
  }

  remove(id: string): boolean {
    const artist = this.findOne(id);
    if (!artist) return false;

    // Remove artist from favorites
    this.favoritesService.removeArtist(id);

    // Update albums and tracks that reference this artist
    this.albumService.removeArtistId(id);
    this.trackService.removeArtistId(id);

    this.artists = this.artists.filter((artist) => artist.id !== id);
    return true;
  }
}
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto.js';
import { UpdateAlbumDto } from './dto/update-album.dto.js';
import { Album } from './interfaces/album.interface.js';
import { TrackService } from '../tracks/track.service.js';
import { FavoritesService } from '../favorites/favorites.service.js';
import { ArtistService } from '../artists/artist.service.js';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  constructor(
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
    private readonly artistService: ArtistService,
  ) {}

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    return this.albums.find((album) => album.id === id);
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    // Validate artistId if provided
    if (createAlbumDto.artistId && !this.artistService.findOne(createAlbumDto.artistId)) {
      createAlbumDto.artistId = null;
    }

    const newAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) return undefined;

    // Validate artistId if provided
    if (updateAlbumDto.artistId && !this.artistService.findOne(updateAlbumDto.artistId)) {
      updateAlbumDto.artistId = null;
    }

    this.albums[albumIndex] = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };

    return this.albums[albumIndex];
  }

  remove(id: string): boolean {
    const album = this.findOne(id);
    if (!album) return false;

    // Remove album from favorites
    this.favoritesService.removeAlbum(id);

    // Update tracks that reference this album
    this.trackService.removeAlbumId(id);

    this.albums = this.albums.filter((album) => album.id !== id);
    return true;
  }

  removeArtistId(artistId: string): void {
    this.albums = this.albums.map((album) => {
      if (album.artistId === artistId) {
        return { ...album, artistId: null };
      }
      return album;
    });
  }
}
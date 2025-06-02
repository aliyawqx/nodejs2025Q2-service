import { Injectable } from '@nestjs/common';
import { ArtistService } from '../artists/artist.service.js';
import { AlbumService } from '../albums/album.service.js';
import { TrackService } from '../tracks/track.service.js';
import { Favorites, FavoritesResponse } from './interfaces/favorites.interface.js';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  findAll(): FavoritesResponse {
    return {
      artists: this.favorites.artists
        .map((id) => this.artistService.findOne(id))
        .filter(Boolean),
      albums: this.favorites.albums
        .map((id) => this.albumService.findOne(id))
        .filter(Boolean),
      tracks: this.favorites.tracks
        .map((id) => this.trackService.findOne(id))
        .filter(Boolean),
    };
  }

  addArtist(id: string): boolean {
    const artist = this.artistService.findOne(id);
    if (!artist) return false;
    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
    return true;
  }

  removeArtist(id: string): boolean {
    const initialLength = this.favorites.artists.length;
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    return this.favorites.artists.length !== initialLength;
  }

  addAlbum(id: string): boolean {
    const album = this.albumService.findOne(id);
    if (!album) return false;
    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
    return true;
  }

  removeAlbum(id: string): boolean {
    const initialLength = this.favorites.albums.length;
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
    return this.favorites.albums.length !== initialLength;
  }

  addTrack(id: string): boolean {
    const track = this.trackService.findOne(id);
    if (!track) return false;
    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }
    return true;
  }

  removeTrack(id: string): boolean {
    const initialLength = this.favorites.tracks.length;
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
    return this.favorites.tracks.length !== initialLength;
  }
}
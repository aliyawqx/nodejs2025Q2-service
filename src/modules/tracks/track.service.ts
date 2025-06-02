import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto.js';
import { UpdateTrackDto } from './dto/update-track.dto.js';
import { Track } from './interfaces/track.interface.js';
import { FavoritesService } from '../favorites/favorites.service.js';
import { ArtistService } from '../artists/artist.service.js';
import { AlbumService } from '../albums/album.service.js';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    return this.tracks.find((track) => track.id === id);
  }

  create(createTrackDto: CreateTrackDto): Track {
    // Validate artistId and albumId if provided
    const artistId = createTrackDto.artistId && 
      this.artistService.findOne(createTrackDto.artistId) ? 
      createTrackDto.artistId : null;
    
    const albumId = createTrackDto.albumId && 
      this.albumService.findOne(createTrackDto.albumId) ? 
      createTrackDto.albumId : null;

    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId,
      albumId,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return undefined;

    // Validate artistId and albumId if provided
    if (updateTrackDto.artistId !== undefined) {
      updateTrackDto.artistId = this.artistService.findOne(updateTrackDto.artistId) ? 
        updateTrackDto.artistId : null;
    }

    if (updateTrackDto.albumId !== undefined) {
      updateTrackDto.albumId = this.albumService.findOne(updateTrackDto.albumId) ? 
        updateTrackDto.albumId : null;
    }

    this.tracks[trackIndex] = {
      ...this.tracks[trackIndex],
      ...updateTrackDto,
    };

    return this.tracks[trackIndex];
  }

  remove(id: string): boolean {
    const track = this.findOne(id);
    if (!track) return false;

    // Remove track from favorites
    this.favoritesService.removeTrack(id);

    this.tracks = this.tracks.filter((track) => track.id !== id);
    return true;
  }

  removeArtistId(artistId: string): void {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === artistId) {
        return { ...track, artistId: null };
      }
      return track;
    });
  }

  removeAlbumId(albumId: string): void {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === albumId) {
        return { ...track, albumId: null };
      }
      return track;
    });
  }
}
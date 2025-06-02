import { Artist } from '../../artists/interfaces/artist.interface.js';
import { Album } from '../../albums/interfaces/album.interface.js';
import { Track } from '../../tracks/interfaces/track.interface.js';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
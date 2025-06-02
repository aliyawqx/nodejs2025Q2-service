import { Module } from '@nestjs/common';
import { ArtistService } from '../modules/artists/artist.service';
import { AlbumService } from '../modules/albums/album.service';
import { TrackService } from '../modules/tracks/track.service';
import { FavoritesService } from '../modules/favorites/favorites.service';

@Module({
  providers: [ArtistService, AlbumService, TrackService, FavoritesService],
  exports: [ArtistService, AlbumService, TrackService, FavoritesService],
})
export class SharedModule {}
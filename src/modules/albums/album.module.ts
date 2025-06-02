import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackService } from '../tracks/track.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistService } from '../artists/artist.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [AlbumController],
})

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService, FavoritesService, ArtistService],
  exports: [AlbumService],
})
export class AlbumModule {}
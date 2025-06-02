import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistService } from '../artists/artist.service';
import { AlbumService } from '../albums/album.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [TrackController],
})

@Module({
  controllers: [TrackController],
  providers: [TrackService, FavoritesService, ArtistService, AlbumService],
  exports: [TrackService],
})
export class TrackModule {}
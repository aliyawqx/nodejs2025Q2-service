import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumService } from '../albums/album.service';
import { TrackService } from '../tracks/track.service';
import { FavoritesService } from '../favorites/favorites.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ArtistController],
})

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, AlbumService, TrackService, FavoritesService],
  exports: [ArtistService],
})
export class ArtistModule {}
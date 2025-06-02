import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { ArtistService } from '../artists/artist.service';
import { AlbumService } from '../albums/album.service';
import { TrackService } from '../tracks/track.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [FavoritesController],
})

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, ArtistService, AlbumService, TrackService],
})
export class FavoritesModule {}
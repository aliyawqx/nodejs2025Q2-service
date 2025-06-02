import { Module } from '@nestjs/common';
import { UserModule } from '../modules/users/user.module';
import { ArtistModule } from '../modules/artists/artist.module';
import { AlbumModule } from '../modules/albums/album.module';
import { TrackModule } from '../modules/tracks/track.module';
import { FavoritesModule } from '../modules/favorites/favorites.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    SharedModule,
  ],
})
export class AppModule {}
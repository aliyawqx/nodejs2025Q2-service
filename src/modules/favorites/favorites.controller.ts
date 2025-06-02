import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id') id: string) {
    const result = this.favoritesService.addTrack(id);
    if (!result) {
      return {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Track not found',
      };
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Track added to favorites',
    };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    const result = this.favoritesService.removeTrack(id);
    if (!result) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Track not in favorites',
      };
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id') id: string) {
    const result = this.favoritesService.addAlbum(id);
    if (!result) {
      return {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Album not found',
      };
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Album added to favorites',
    };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    const result = this.favoritesService.removeAlbum(id);
    if (!result) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Album not in favorites',
      };
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id') id: string) {
    const result = this.favoritesService.addArtist(id);
    if (!result) {
      return {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Artist not found',
      };
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Artist added to favorites',
    };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    const result = this.favoritesService.removeArtist(id);
    if (!result) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Artist not in favorites',
      };
    }
  }
}
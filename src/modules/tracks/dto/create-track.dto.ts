export class CreateTrackDto {
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;
}
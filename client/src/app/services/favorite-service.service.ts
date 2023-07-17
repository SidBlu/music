import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteServiceService {

  favoriteArtists: number[] = [];

  getFavoriteArtistIds(): Observable<number[]> {
    return of(this.favoriteArtists);
  }

  toggleFavorite(artistId: number): void {
    if (this.isFavorite(artistId)) {
      this.favoriteArtists = this.favoriteArtists.filter((id) => id !== artistId);
    } else {
      this.favoriteArtists.push(artistId);
    }
  }

  isFavorite(artistId: number): boolean {
    return this.favoriteArtists.includes(artistId);
  }
}

import { Component } from '@angular/core';
import { InfoArtist } from 'src/app/models/information.model';
import { FavoriteServiceService } from 'src/app/services/favorite-service.service';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favoriteArtists: InfoArtist[] = [];

  constructor(private infoService: InformationsService, private favoriteService: FavoriteServiceService) {
    this.loadFavoriteArtists();
  }

  loadFavoriteArtists(): void {
    this.favoriteService.getFavoriteArtistIds().subscribe((favoriteArtistIds) => {
      this.infoService.getArtistsAsync().subscribe((artists) => {
        const favoriteArtistIdsStr = favoriteArtistIds.map(Number);
        this.favoriteArtists = artists.filter((artist) => favoriteArtistIdsStr.includes(artist._id));
      });
    });
  }
}

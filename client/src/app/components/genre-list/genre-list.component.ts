import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoArtist } from 'src/app/models/information.model';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit{
  genre: string;
  artists: InfoArtist[] = [];
  // page = 1;
  // infosPerPagina = 4;

  constructor(
    private infoService: InformationsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genre = params['genre'];
      this.fetchArtistsByGenre();
    });
  }

  // accorciaTesto(descrizione): number {
  //   let lunghezzaMassima = 180;
  //   if(descrizione.length <= lunghezzaMassima) {
  //     return lunghezzaMassima;
  //   } else {
  //     let ultimoSpazio = descrizione.lastIndexOf(' ', lunghezzaMassima);
  //     return ultimoSpazio;
  //   }
  // }

  // infos$ = this.infoService.getArtistsAsync();

  // pagination(e) {
  //   e.page = e.page + 1;
  //   this.page = e.page;
  // }

  fetchArtistsByGenre(): void {
    this.infoService.getArtistsByGenre(this.genre).subscribe({
      next: (artists) => {
        this.artists = artists;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}

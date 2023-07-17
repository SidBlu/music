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

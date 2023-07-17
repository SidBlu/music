import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { InfoArtist } from 'src/app/models/information.model';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-informations-list',
  templateUrl: './informations-list.component.html',
  styleUrls: ['./informations-list.component.scss']
})
export class InformationsListComponent implements OnInit{
  // infos: InfoArtist[];
  infos$: Observable<InfoArtist[]> = this.infoService.getArtistsAsync().pipe(
    map(infos => infos),
  );

  constructor(private infoService: InformationsService) {}

  ngOnInit(): void {
  }

  // onGetInformationArtist() {
  //   this.infoService.getInfoArtists().subscribe({
  //     next: (res) => {
  //       this.infos = res;
  //     },
  //     error: (error) => {
  //       console.log(error)
  //     }
  //   })
  // }
}



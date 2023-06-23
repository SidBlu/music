import { Component, OnInit } from '@angular/core';
import { InfoArtist } from 'src/app/models/information.model';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  infos: InfoArtist[];

  constructor(private infoService: InformationsService) {}

  ngOnInit(): void {
    this.onGetInformationArtist();
  }

  onGetInformationArtist() {
    this.infoService.getInfoArtist().subscribe({
      next: (res) => {
        this.infos = res;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}

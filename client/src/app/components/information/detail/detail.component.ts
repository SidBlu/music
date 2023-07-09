import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoArtist } from 'src/app/models/information.model';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  infoartist: InfoArtist;

  constructor(
    private infoService: InformationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onGetInfoArtist();
  }

  onGetInfoArtist(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('_id');
    this.infoService.getInfoArtist(id).subscribe({
      next: (res) => {
        this.infoartist = res;
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
}

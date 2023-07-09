import { Component, Input } from '@angular/core';
import { InfoArtist } from 'src/app/models/information.model';
import { UserService } from 'src/app/services/user.service';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss']
})
export class InformationCardComponent{
  @Input() informs: InfoArtist[];
  page = 1;
  infosPerPagina = 4;

  ruolo: any;
  recupera_ruolo = this.userService.ruoloUtente.subscribe(res => this.ruolo = res);

  constructor(private userService: UserService, private infoService: InformationsService) {}

  accorciaTesto(descrizione): number {
    let lunghezzaMassima = 180;
    if(descrizione.length <= lunghezzaMassima) {
      return lunghezzaMassima;
    } else {
      let ultimoSpazio = descrizione.lastIndexOf(' ', lunghezzaMassima);
      return ultimoSpazio;
    }
  }

  infos$ = this.infoService.getArtistsAsync();

  pagination(e) {
    e.page = e.page + 1;
    this.page = e.page;
  }
}

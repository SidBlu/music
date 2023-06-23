import { Component, Input } from '@angular/core';
import { InfoArtist } from 'src/app/models/information.model';

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss']
})
export class InformationCardComponent {
  @Input() informs: InfoArtist[];
}

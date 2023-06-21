import { Component } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  music = 'music';
  musicaScelta : string;

  changeSwitch(){
    this.music = this.musicaScelta
  }
}

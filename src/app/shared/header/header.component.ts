import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  // artistSelected: boolean = false;
  // songSelected: boolean = false;

  // selectArtist() {
  //   this.artistSelected = true;
  //   this.songSelected = false;
  // }

  // selectSong() {
  //   this.songSelected = true;
  //   this.artistSelected = false
  // }
}

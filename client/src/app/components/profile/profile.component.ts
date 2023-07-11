import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dati: any;
  ruolo: any;

  dataRegistrazione: any;

  constructor(private userService: UserService) {
    this.userService.ruoloUtente.subscribe(res => {this.ruolo = res, sessionStorage.setItem('userRole', res.toString())});
  }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('user'))) {
      this.prendiProfilo(JSON.parse(localStorage.getItem('user')).email);
      // this.dataRegistrazione = new Date(this.user.createdAt).toLocaleString();
    }

    if(sessionStorage.getItem('userRole')) {
      this.ruolo = sessionStorage.getItem('userRole');
    }
  }

  prendiProfilo(email: string) {
    this.userService.getUser(email).pipe(take(1)).subscribe({
      next: res => {
        this.dati = res;
        this.dataRegistrazione = moment(this.dati.createdAt).locale('it').format('dddd DD MMMM YYYY');
      }
    })
  }
}

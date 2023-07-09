import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InfoArtist } from 'src/app/models/information.model';
import { InformationsService } from 'src/app/services/informations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  @ViewChild('modalRegistration', {static: false}) modale: ElementRef;
  infos: InfoArtist[];
  nome: string;
  email: string;

  constructor(private infoService: InformationsService, private modalService: NgbModal, private userService: UserService) {}

  ngOnInit(): void {
    this.onGetInformationArtist();

    this.userService.datiUtente.pipe(take(1)).subscribe((res: any) => {
      this.nome = res.name;
      this.email = res.email;
      // localStorage.setItem('nome', res.name);
      // localStorage.setItem('email', res.email);
      this.open(this.modale);
    });

    if(localStorage.getItem('nome')) {
      this.nome = localStorage.getItem('nome');
      this.nome = localStorage.getItem('email');
    }
  }

  open(content: any) {
    if(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modale privacy', size: 'lg', centered: true}).result
      .then((res) => {
        console.log('azione da eseguire in caso positivo')
      }).catch((res) => {
        console.log('nessuno azione da eseguire');
        location.reload();
      })
    }
  }

  onGetInformationArtist() {
    this.infoService.getInfoArtists().subscribe({
      next: (res) => {
        this.infos = res;
        this.infos = this.infos.slice(-4).reverse();
      },
      error: (error) => {
        console.log(error)
        localStorage.removeItem('nome');
      }
    })
  }
}

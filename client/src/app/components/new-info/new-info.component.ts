import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import { InfoArtist } from 'src/app/models/information.model';
import { InformationsService } from 'src/app/services/informations.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-new-info',
  templateUrl: './new-info.component.html',
  styleUrls: ['./new-info.component.scss']
})
export class NewInfoComponent implements OnInit {
  @ViewChild('artistModal') artistModal: ElementRef;
  newArtist: InfoArtist;
  name: string;
  surname: string;
  image: string;
  birthdate: string;
  citizenship: string;
  genres: string;
  history: string;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private userService: UserService,
    private informationService: InformationsService
  ) {}

  artistForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    image: new FormControl(''),
    birthdate: new FormControl(''),
    citizenship: new FormControl(''),
    genres: new FormControl(''),
    history: new FormControl('')
  });

  ngOnInit(): void {
    const user = {
      name: this.artistForm.value.name,
      surname: this.artistForm.value.surname,
      image: this.artistForm.value.image,
      birthdate: this.artistForm.value.birthdate,
      citizenship: this.artistForm.value.citizenship,
      genres: this.artistForm.value.genres,
      history: this.artistForm.value.history
    };
    this.userService.datiNewUtente.pipe(take(1)).subscribe((res: any) => {
      this.name = res.name;
      this.surname = res.surname;
      this.image = res.image;
      this.birthdate = res.birthdate;
      this.citizenship = res.citizenship;
      this.genres = res.genres;
      this.history = res.history;
      this.open(this.artistModal, user);
    });

    if(localStorage.getItem('name')) {
      this.name = localStorage.getItem('name');
      this.surname = localStorage.getItem('surname');
      this.image = localStorage.getItem('image');
      this.birthdate = localStorage.getItem('birthdate');
      this.citizenship = localStorage.getItem('citizenship');
      this.genres = localStorage.getItem('genres');
      this.history = localStorage.getItem('history');
    }
  }

  onSubmit() {
    console.log(this.artistForm.value);
    const user = {
      name: this.artistForm.value.name,
      surname: this.artistForm.value.surname,
      image: this.artistForm.value.image,
      birthdate: this.artistForm.value.birthdate,
      citizenship: this.artistForm.value.citizenship,
      genres: this.artistForm.value.genres,
      history: this.artistForm.value.history
    };
    this.userService.datiNewUtente.next(user);

    const artistData: InfoArtist = {
      name: this.artistForm.value.name,
      surname: this.artistForm.value.surname,
      image: this.artistForm.value.image,
      birthdate: this.artistForm.value.birthdate,
      citizenship: this.artistForm.value.citizenship,
      genres: this.artistForm.value.genres,
      history: this.artistForm.value.history
    };

    this.informationService.createInfoArtist(artistData).subscribe({
      next: (res) => {
        this.newArtist = res;
      },
      error: (error) => {
        console.log(error)
      }
    });

  }

  addAnotherArtist() {
    this.artistForm.reset();
    this.modalService.dismissAll();
  }

  open(content: any, user: any) {
    if (content) {
      this.modalService.open(content, {ariaLabelledBy: 'modale privacy', size: 'lg', centered: true}).result
      .then((res) => {
        console.log('azione da eseguire in caso positivo');
        this.userService.datiNewUtente.next(user);
        this.router.navigateByUrl('nuovaricetta');
      }).catch((res) => {
        console.log('nessuno azione da eseguire');
      })
    }
  }

  closeNewArtist() {
    this.router.navigateByUrl('artist');
  }
}

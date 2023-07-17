import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { InfoArtist } from 'src/app/models/information.model';
import { UserService } from 'src/app/services/user.service';
import { InformationsService } from 'src/app/services/informations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss']
})
export class InformationCardComponent implements OnInit{
  @ViewChild('deletemodale') deleteModal: TemplateRef<any>;
  @Input() informs: InfoArtist[];
  favoriteArtists: string[] = [];
  page = 1;
  infosPerPagina = 4;
  editMode = false;
  editArtista: any;
  nuovaArtista: any;
  deleteInfoId: number;
  artistaDaEliminare: InfoArtist;
  totArtist: InfoArtist[] = [];


  ruolo: any;
  recupera_ruolo = this.userService.ruoloUtente.subscribe(res => this.ruolo = res);

  editor = ClassicEditor;

  editorConfig = {
    toolbar: {
        items: [
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'codeBlock',
            'undo',
            'redo',
        ]
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    height: 300,
};

form = new FormGroup({
  name: new FormControl(''),
  surname: new FormControl(''),
  image: new FormControl(''),
  birthdate: new FormControl(''),
  citizenship: new FormControl(''),
  genres: new FormControl(''),
  history: new FormControl('')
});

  constructor(private userService: UserService, private infoService: InformationsService, private router: Router, private modalService: NgbModal, private messageService: MessageService) { }

  accorciaTesto(descrizione): number {
    let lunghezzaMassima = 180;
    if(descrizione.length <= lunghezzaMassima) {
      return lunghezzaMassima;
    } else {
      let ultimoSpazio = descrizione.lastIndexOf(' ', lunghezzaMassima);
      return ultimoSpazio;
    }
  }

  ngOnInit() {
    this.loadFavoriteArtists();
  }

  infos$ = this.infoService.getArtistsAsync();

  pagination(e) {
    e.page = e.page + 1;
    this.page = e.page;
  }

  loadFavoriteArtists(): void {
    // Assuming you have a method in the information service to get favorite artists' IDs
    this.infoService.getFavoriteArtistIds().subscribe((ids) => {
      this.favoriteArtists = ids;
    });
  }

  toggleFavorite(artistId: string): void {
    if (this.isFavorite(artistId)) {
      this.favoriteArtists = this.favoriteArtists.filter((id) => id !== artistId);
    } else {
      this.favoriteArtists.push(artistId);
    }

    // Save the updated favorite artists' IDs to the backend (optional)
    this.infoService.updateFavoriteArtistIds(this.favoriteArtists).subscribe();
  }

  isFavorite(artistId: string): boolean {
    return this.favoriteArtists.includes(artistId);
  }

  updateRecipe(id: number, form: FormGroup): void {
    const updatedRecipe = form.value;

    this.infoService.updateArtist(id, updatedRecipe).subscribe({
      next: (res) => {
        this.informs = this.informs.map((info) =>
        info._id === id ? res : info
        );
        this.modalService.dismissAll();
        this.editMode = false;
        this.messageService.add({severity:'success', summary:'Successo', detail:'Modificato con successo', life: 3000});
      },
      error: (err) => console.log(err)
    });
  }

  deleteRecipe(): void {
    const id = this.deleteInfoId;
    this.infoService.deleteArtist(id).subscribe({
      next: () => {
        this.informs = this.informs.filter(info => info._id !== id);
        this.totArtist = this.totArtist.filter(info => info._id !== id);
        this.messageService.add({severity:'success', summary:'Successo', detail:'Eliminato con successo', life: 3000});
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  openUpdate(content: any, form: any, information: InfoArtist){
    this.editMode = true;
    this.nuovaArtista = form;
    this.editArtista = information;

    this.form.patchValue({
      name: information.name,
      surname: information.surname,
      image: information.image,
      birthdate: information.birthdate,
      citizenship: information.citizenship,
      genres: information.genres,
      history: information.history
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true, scrollable: true} ).result.then((res) => {
      this.router.navigate(['/artist/artists'])

    }).catch((res) => {
      console.log('nessuna azione da eseguire')
    })
  }

  openDelete(id: number) {
    this.deleteInfoId = id;
    this.artistaDaEliminare = this.informs.find(info => info._id === id);
    this.modalService.open(this.deleteModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true, scrollable: true }).result
    .then((res) => {
      if (res === 'delete') {
        this.deleteRecipe();
      }
      this.router.navigate(['/artist/artists']);
    }).catch((res) => {
        console.log('No action to be taken');
      });
  }
}

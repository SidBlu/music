import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoArtist } from 'src/app/models/information.model';
import { InformationsService } from 'src/app/services/informations.service';
import { UserService } from 'src/app/services/user.service';
import * as classicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-new-info',
  templateUrl: './new-info.component.html',
  styleUrls: ['./new-info.component.scss']
})
export class NewInfoComponent{
  @ViewChild('artistModal') artistModal: ElementRef;
  newArtist: InfoArtist;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private informationService: InformationsService
  ) {}

Editor = classicEditorBuild;
editorConfig = {
  toolbar: {
      items: [
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'indent',
          'outdent',
          '|',
          'codeBlock',
          'imageUpload',
          'blockQuote',
          'insertTable',
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

  artistForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    image: new FormControl(''),
    birthdate: new FormControl(''),
    citizenship: new FormControl(''),
    genres: new FormControl(''),
    history: new FormControl('')
  });

  onSubmit() {
    console.log(this.artistForm.value);
    if(this.artistForm.value){
      this.informationService.createInfoArtist(this.artistForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.newArtist = res;
          this.open(this.artistModal);
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modale privacy', size: 'lg', centered: true} ).result
    .then((res) => {
      this.artistForm.reset();
    })
    .catch((res) => {
      this.router.navigateByUrl('artist');
    })
  }
}

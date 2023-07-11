import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import * as classicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  titolo = 'pasta al sugo';
  id = 24;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]),
    repeatPassword: new FormControl('', Validators.required),
    note: new FormControl(''),
  });

  constructor(private config: PrimeNGConfig, private modalService: NgbModal, private router: Router, private userService: UserService) {}

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

  ngOnInit(): void {
    this.config.setTranslation({
      weak: 'povera',
      medium: 'medium',
      strong: 'forte',
      accept: 'accetto',
      passwordPrompt: 'Scrivi una password'
    })
  }

  onSubmit() {
    console.log(this.form.value);
    const user = {name: this.form.value.username, email: this.form.value.email};
    this.userService.datiUtente.next(user);

    this.userService.registerUser(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('home');
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  checkPasswordMatch(): boolean {
    let password = this.form.controls.password.value;
    let repeatPassword = this.form.controls.repeatPassword.value;
    if(password == repeatPassword) {
      return true;
    } else {
      return false;
    }
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modale privacy', size: 'lg', centered: true}).result
    .then((res) => {
      console.log('azione da eseguire in caso positivo')
    }).catch((res) => {
      console.log('nessuno azione da eseguire')
    })
  }
}

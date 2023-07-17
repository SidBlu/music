import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { InformationComponent } from './information.component';
import { InformationCardComponent } from 'src/app/shared/information-card/information-card.component';
import { DetailComponent } from './detail/detail.component';
import { InformationsListComponent } from './informations-list/informations-list.component';
import { NewInfoComponent } from './new-info/new-info.component';
import { InformationsRoutingModule } from './informations-routing.module';

@NgModule({
  declarations: [
    InformationComponent,
    InformationCardComponent,
    DetailComponent,
    InformationsListComponent,
    NewInfoComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    HttpClientModule,
    ToastModule,
    DividerModule,
    CKEditorModule,
    CommonModule,
    InformationsRoutingModule,
  ],
  providers: [],
  exports: [InformationCardComponent]
})

export class InformationsModule { }

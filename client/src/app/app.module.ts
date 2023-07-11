import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { InformationComponent } from './components/information/information.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PremiumSubComponent } from './components/premium-sub/premium-sub.component';
import { InformationCardComponent } from './shared/information-card/information-card.component';
import { DetailComponent } from './components/information/detail/detail.component';
import { InformationsListComponent } from './components/information/informations-list/informations-list.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { NewInfoComponent } from './components/new-info/new-info.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InformationComponent,
    CarouselComponent,
    HomeComponent,
    PagenotfoundComponent,
    FavoritesComponent,
    PremiumSubComponent,
    InformationCardComponent,
    DetailComponent,
    InformationsListComponent,
    RegistrationComponent,
    LoginComponent,
    NewInfoComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    BrowserAnimationsModule,
    PaginatorModule,
    HttpClientModule,
    ToastModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

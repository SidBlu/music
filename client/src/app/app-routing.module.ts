import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InformationComponent } from './components/information/information.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PremiumSubComponent } from './components/premium-sub/premium-sub.component';
import { DetailComponent } from './components/information/detail/detail.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { InformationsListComponent } from './components/information/informations-list/informations-list.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { NewInfoComponent } from './components/new-info/new-info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { loggedInGuard } from './logged-in.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'artist', component: InformationComponent, children: [
    {path: 'detail/:name/:_id', component: DetailComponent},
    {path: '', component: InformationsListComponent, pathMatch: 'full'},
  ]},
  {path: 'favorite', component: FavoritesComponent},
  {path: 'premium', component: PremiumSubComponent},
  {path: 'newartist', component: NewInfoComponent},
  {path: 'registrati', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [loggedInGuard]},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

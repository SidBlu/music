import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PremiumSubComponent } from './components/premium-sub/premium-sub.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { loggedInGuard } from './logged-in.guard';
import { GenreListComponent } from './components/genre-list/genre-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'artist', loadChildren: () => import('./components/information/informations.module').then(modulo => modulo.InformationsModule)},
  {path: 'login', loadChildren: () => import('./components/user/users.module').then(modulo => modulo.UsersModule)},
  {path: 'favorite', component: FavoritesComponent},
  {path: 'premium', component: PremiumSubComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [loggedInGuard]},
  {path: 'artist/genre/:genre', component: GenreListComponent },
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

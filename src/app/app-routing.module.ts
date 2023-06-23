import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InformationComponent } from './components/information/information.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PremiumSubComponent } from './components/premium-sub/premium-sub.component';
import { DetailComponent } from './components/information/detail/detail.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'artist', component: InformationComponent},
  {path: 'favorite', component: FavoritesComponent},
  {path: 'premium', component: PremiumSubComponent},
  {path: 'detail/:_id', component: DetailComponent},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

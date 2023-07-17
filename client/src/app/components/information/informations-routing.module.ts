import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InformationComponent } from "./information.component";
import { DetailComponent } from "./detail/detail.component";
import { InformationsListComponent } from "./informations-list/informations-list.component";
import { NewInfoComponent } from "./new-info/new-info.component";


const routes: Routes = [
  {path: '', component: InformationComponent, children: [
    {path: 'artists', component: InformationsListComponent},
    {path: 'detail/:name/:_id', component: DetailComponent},
    {path: 'newartist', component: NewInfoComponent},
    {path: '', component: InformationsListComponent, pathMatch: 'full'},
  ]},
];

@NgModule ({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InformationsRoutingModule { }

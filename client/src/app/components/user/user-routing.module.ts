import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./users.component";

const routes: Routes = [
  {path: '', component: UserComponent, children: [
    {path: '', component: LoginComponent},
    {path: 'registrati', component: RegistrationComponent},
  ]},


];

@NgModule ({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }

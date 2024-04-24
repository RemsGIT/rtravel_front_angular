import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {authGuard} from "./guards/auth.guard";
import {HomeComponent} from "./pages/home/home.component";
import {TripDetailComponent} from "./pages/trip-detail/trip-detail.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {CheckEmailComponent} from "./pages/auth/check-email/check-email.component";

export const routes: Routes = [
  {path: 'connexion', component: LoginComponent},
  {path: 'inscription', component: RegisterComponent},
  {path: 'verification-mail', component: CheckEmailComponent},


  {path: 'accueil', component: HomeComponent, canActivate: [authGuard]},
  {path: 'voyage/:id', component: TripDetailComponent, canActivate: [authGuard]},
];

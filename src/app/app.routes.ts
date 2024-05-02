import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {authGuard} from "./guards/auth.guard";
import {HomeComponent} from "./pages/home/home.component";
import {TripDetailComponent} from "./pages/trip-detail/trip-detail.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {CheckEmailComponent} from "./pages/auth/check-email/check-email.component";
import {CreateTripComponent} from "./pages/create-trip/create-trip.component";
import {ListPaymentsComponent} from "./pages/list-payments/list-payments.component";

export const routes: Routes = [
  {path: 'connexion', component: LoginComponent, title: "Rtravel | Planificateur de voyage"},
  {path: 'inscription', component: RegisterComponent, title: "Rtravel | Planificateur de voyage"},
  {path: 'verification-mail', component: CheckEmailComponent, title: "Rtravel | Planificateur de voyage"},


  {path: 'accueil', component: HomeComponent, canActivate: [authGuard], title: "Rtravel | Planifie tes voyages", data: {animation: 'HomePage'}},
  {path: 'voyage/new', component: CreateTripComponent, canActivate: [authGuard], title: "Rtravel | Nouveau voyage"},
  {path: 'voyage/:id', component: TripDetailComponent, canActivate: [authGuard], data: {animation: 'AboutPage'}},

  {path: 'voyage/:id/depenses', component: ListPaymentsComponent, canActivate: [authGuard], title: 'Rtravel | Liste des dépenses de ton voyage'},
];

import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {authGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {CheckEmailComponent} from "./pages/auth/check-email/check-email.component";
import {CreateTripComponent} from "./pages/create-trip/create-trip.component";
import {ListPaymentsComponent} from "./pages/list-payments/list-payments.component";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {WorldMapComponent} from "./pages/world-map/world-map.component";
import {LegalNoticesComponent} from "./pages/legal-notices/legal-notices.component";
import {TermsConditionsComponent} from "./pages/terms-conditions/terms-conditions.component";
import {GoogleCallbackComponent} from "./pages/auth/oauth/google-callback/google-callback.component";

export const routes: Routes = [

  {path: '', component: LandingPageComponent, title: 'Rtravel | Planificateur de voyage'},
  {path: 'mentions-legales', component: LegalNoticesComponent, title: 'Rtravel | Mentions légales'},
  {path: 'cgu', component: TermsConditionsComponent, title: 'Rtravel | CGU'},


  {path: 'connexion', component: LoginComponent, title: "Rtravel | Planificateur de voyage", data: {animation: 'ConnectPage'}},
  {path: 'inscription', component: RegisterComponent, title: "Rtravel | Planificateur de voyage", data: {animation: 'RegisterPage'}},
  {path: 'verification-mail', component: CheckEmailComponent, title: "Rtravel | Planificateur de voyage", data: {animation: 'CheckEmailPage'}},


  {path: 'accueil', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), canActivate: [authGuard], title: "Rtravel | Planifie tes voyages", data: {animation: 'HomePage'}},
  {path: 'voyage/new', component: CreateTripComponent, canActivate: [authGuard], title: "Rtravel | Nouveau voyage", data: {animation: 'CreateTripPage'}},

  {path: 'voyage/:id', loadComponent: () => import("./pages/trip-detail/trip-detail.component").then(m => m.TripDetailComponent), canActivate: [authGuard], data: {animation: 'NewTripPage'}},
  {path: 'voyage/:id/depenses', component: ListPaymentsComponent, canActivate: [authGuard], title: 'Rtravel | Liste des dépenses de ton voyage', data: {animation: 'PaymentsPage'}},

  {path: 'profil', component: ProfileComponent, canActivate: [authGuard], title: 'Rtravel | Profil utilisateur' ,data: {animation: 'ProfilePage'}},
  {path: 'map', component: WorldMapComponent, canActivate: [authGuard], title: 'Rtravel | Carte des pays visités' ,data: {animation: 'WorldMapPage'}},

  // OAUTH CALLBACK
  {path: 'auth/google/callback/:token', component: GoogleCallbackComponent}


];

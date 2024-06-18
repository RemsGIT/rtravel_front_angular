import {Component, inject, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ChildrenOutletContexts, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {ButtonModule} from "primeng/button";
import {NgxSonnerToaster} from "ngx-sonner";
import {isPlatformBrowser, Location} from "@angular/common";
import {AuthService} from "./services/auth/auth.service";
import {TokenService} from "./services/token/token.service";
import { HttpClient } from "@angular/common/http";
import {IUser} from "../models/auh.model";
import {apiEndpoint} from "./constants";
import {HeaderComponent} from "./components/header/header.component";
import {PrimeNGConfig} from "primeng/api";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {CalendarModule} from "primeng/calendar";
import {fadeAnimation} from "./animations";
import {MenuSidebarComponent} from "./components/utils/menu-sidebar/menu-sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, NgxSonnerToaster, HeaderComponent, TranslateModule, CalendarModule, MenuSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    fadeAnimation,
  ],
})
export class AppComponent {
  authService = inject(AuthService)
  tokenService = inject(TokenService)
  router = inject(Router)
  location = inject(Location)
  http = inject(HttpClient)

  showHeader: Boolean = false;
  title = 'rtravel-angular-primeng';


  routesWithoutHeader = ['', '/connexion', '/inscription', '/verification-mail']
  routesWithoutAuth = ['', '/connexion', '/inscription', '/verification-mail']

  constructor(private config: PrimeNGConfig, private translateService: TranslateService, private contexts: ChildrenOutletContexts, @Inject(PLATFORM_ID) protected platformId: Object) {

    translateService.addLangs(['en', 'fr']);
    translateService.setDefaultLang('fr');

    this.translateService.stream('primeng').subscribe(data => {
      this.config.setTranslation(data);
    });

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.showHeader = !this.routesWithoutHeader.includes(this.location.path())

        if(!this.authService.currentUserSig()) {
          if (this.routesWithoutAuth.includes(this.location.path())) return;
          if (isPlatformBrowser(this.platformId)) {
            this.http.get<IUser>(`${apiEndpoint}/auth/me`)
              .subscribe({
                next: (response) => {
                  this.authService.currentUserSig.set(response)
                },
                error: (e) => {
                  let redirectTo = '/connexion'
                  switch (e.status) {
                    case 400:
                      if (e.error.error === "ACCOUNT_NOT_VERIFIED") {
                        redirectTo = '/verification-mail'
                      }
                      break;
                    case 401:
                      this.authService.currentUserSig.set(null)
                      this.tokenService.setToken('')
                      break;
                  }

                  this.router.navigateByUrl(redirectTo)
                }
              })
          }
        }
      }
    })
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
  }

  getRouteAnimationData() {

    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  protected readonly isPlatformBrowser = isPlatformBrowser;
}

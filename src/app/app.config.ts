import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from "@angular/platform-browser/animations";
import {HttpClient, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./interceptors/auth.interceptor";
import {
  LucideAngularModule,
  Check,
  Clock,
  Coins,
  Flag,
  Hourglass,
  MapPin,
  Plane,
  Map,
  Plus,
  CircleHelp,
  EllipsisVertical,
  Pencil,
  Trash,
  User,
  Users,
  LogOut,
  TentTree,
  ArrowRight,
  ArrowLeft,
  BedDouble,
  Car,
  Train,
  Bus


} from "lucide-angular";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    importProvidersFrom(
      LucideAngularModule.pick({
        Hourglass,
        Check,
        Map,
        MapPin,
        Clock,
        Flag,
        Coins,
        Plane,
        Plus,
        CircleHelp,
        EllipsisVertical,
        Pencil,
        Trash,
        User,
        Users,
        LogOut,
        TentTree,
        ArrowRight,
        ArrowLeft,
        BedDouble,
        Car,
        Train,
        Bus
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimations(),
  ]
};

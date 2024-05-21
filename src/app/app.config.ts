import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
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
  Bus,
  PiggyBank,
  Eye,
  Search,
  Calculator,
  List,
  Mail,
  Maximize2,
  Minimize2


} from "lucide-angular";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideServiceWorker} from '@angular/service-worker';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(LucideAngularModule.pick({
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
      Bus,
      PiggyBank,
      Eye,
      Search,
      Calculator,
      List,
      Mail,
      Maximize2,
      Minimize2
    }), TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    })),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ]
};

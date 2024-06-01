import {Component, inject, OnInit} from '@angular/core';
import {TripUpcomingCardComponent} from "../../components/home/trip-upcoming-card/trip-upcoming-card.component";
import {TripFutureSliderComponent} from "../../components/home/trip-future-slider/trip-future-slider.component";
import {TripPastSliderComponent} from "../../components/home/trip-past-slider/trip-past-slider.component";
import {HttpClient} from "@angular/common/http";
import {apiEndpoint} from "../../constants";
import {NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {LucideAngularModule} from "lucide-angular";
import {animate, style, transition, trigger} from "@angular/animations";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        TripUpcomingCardComponent,
        TripFutureSliderComponent,
        TripPastSliderComponent,
        NgOptimizedImage,
        ButtonModule,
        RouterLink,
        LucideAngularModule
    ],
  templateUrl: './home.component.html',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit{
  http= inject(HttpClient)
  router = inject(Router)
  tokenService = inject(TokenService)

  hasTrip = false
  isDataLoaded = false

  ngOnInit(): void {
    this.http.get(`${apiEndpoint}/user/hastrips`)
      .subscribe({
        next: (res: any) => {
          setTimeout(() => {
            this.hasTrip = res.result
            this.isDataLoaded = true
          }, 3000)

        },
        error: e => { // User is not logged in
          if(e.status === 401) this.router.navigateByUrl("/connexion")
          this.tokenService.setToken("")
        }
      })
  }

}

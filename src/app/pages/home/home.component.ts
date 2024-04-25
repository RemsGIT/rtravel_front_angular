import {Component, inject, OnInit} from '@angular/core';
import {TripUpcomingCardComponent} from "../../components/home/trip-upcoming-card/trip-upcoming-card.component";
import {TripFutureSliderComponent} from "../../components/home/trip-future-slider/trip-future-slider.component";
import {TripPastSliderComponent} from "../../components/home/trip-past-slider/trip-past-slider.component";
import {HttpClient} from "@angular/common/http";
import {apiEndpoint} from "../../constants";
import {NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TripUpcomingCardComponent,
    TripFutureSliderComponent,
    TripPastSliderComponent,
    NgOptimizedImage,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  http= inject(HttpClient)

  hasTrip = false

  ngOnInit(): void {
    this.http.get(`${apiEndpoint}/user/hastrips`)
      .subscribe({
        next: (res: any) => {
          this.hasTrip = res.result
        }
      })
  }

}

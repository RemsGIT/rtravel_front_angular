import {Component, inject} from '@angular/core';
import {TripUpcomingCardComponent} from "../../components/home/trip-upcoming-card/trip-upcoming-card.component";
import {TripFutureSliderComponent} from "../../components/home/trip-future-slider/trip-future-slider.component";
import {TripPastSliderComponent} from "../../components/home/trip-past-slider/trip-past-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TripUpcomingCardComponent,
    TripFutureSliderComponent,
    TripPastSliderComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}

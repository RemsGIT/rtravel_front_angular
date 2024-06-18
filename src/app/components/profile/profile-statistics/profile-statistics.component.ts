import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {TripService} from "../../../services/trip/trip.service";
import { HttpClient } from "@angular/common/http";
import {apiEndpoint} from "../../../constants";
import {CountryVisitedService} from "../../../services/country-visited/country-visited.service";

@Component({
  selector: 'app-profile-statistics',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './profile-statistics.component.html',
})
export class ProfileStatisticsComponent implements OnInit {
  httpClient = inject(HttpClient)
  tripService = inject(TripService)
  countryVisitedService = inject(CountryVisitedService)

  countTrip: number = 0
  countCountry: number = 0

  ngOnInit() {
    this.httpClient.get(`${apiEndpoint}/trips`)
      .subscribe({
        next: (response: any) => {
          this.countTrip = response.trips.length + response.shared.length
        },
        error: e => {
          console.log(e)
        }
      })

    this.countryVisitedService.getCountriesVisited()
      .subscribe({
        next: countries => {
          this.countCountry = countries.length
        }
      })
  }
}

import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {TripService} from "../../../services/trip/trip.service";
import {HttpClient} from "@angular/common/http";
import {apiEndpoint} from "../../../constants";
import {Trip} from "../../../../models/trip.model";

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

  countTrip: number = 0
  countCountry: number = 0

  ngOnInit() {
    this.httpClient.get(`${apiEndpoint}/trips`)
      .subscribe({
        next: (response: any) => {
          this.countTrip = response.trips.length + response.shared.length
          this.countCountry = this.countUniqueCountryCodes(response)
        },
        error: e => {
          console.log(e)
        }
      })
  }

   countUniqueCountryCodes = (data: any) => {
    const uniqueCountryCodes = new Set();

    data.trips.forEach((trip: Trip) => {
      if (trip.countryCode) {
        uniqueCountryCodes.add(trip.countryCode);
      }
    });

    data.shared.forEach((sharedItem: Trip) => {
      if (sharedItem.countryCode) {
        uniqueCountryCodes.add(sharedItem.countryCode);
      }
    });

    return uniqueCountryCodes.size;
  };

}

import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {HttpClient} from "@angular/common/http";
import {Trip} from "../../../../models/trip.model";
import {apiEndpoint} from "../../../constants";
import dayjs from 'dayjs';

import {RouterLink} from "@angular/router";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-trip-past-slider',
  standalone: true,
    imports: [
        LucideAngularModule,
        RouterLink,
        CardModule
    ],
  templateUrl: './trip-past-slider.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TripPastSliderComponent {
  private http = inject(HttpClient)

  trips: Trip[] | null = null

  ngOnInit(): void {
    this.http.get<{trips: Trip[]}>(`${apiEndpoint}/trips/past`)
      .subscribe(response => {
          this.trips = response.trips
      })
  }


  protected readonly dayjs = dayjs;
  protected readonly Math = Math;
}

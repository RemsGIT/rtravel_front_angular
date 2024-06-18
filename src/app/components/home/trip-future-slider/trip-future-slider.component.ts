import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import { HttpClient } from "@angular/common/http";
import {Trip} from "../../../../models/trip.model";
import {apiEndpoint, constants} from "../../../constants";

import dayjs from "dayjs";
import {RouterLink} from "@angular/router";
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {TagTripSharedComponent} from "../../trip/utils/tag-trip-shared/tag-trip-shared.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-trip-future-slider',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    CardModule,
    TagModule,
    TagTripSharedComponent,
    NgOptimizedImage
  ],
  templateUrl: './trip-future-slider.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TripFutureSliderComponent implements OnInit {
  private http = inject(HttpClient)

  trips: Trip[] | null = null

  isLoaded = false

  swiperBreakpoints = {
    750: {
      slidesPerView: 4.3
    },
  }

  ngOnInit(): void {
    this.http.get<{trips: Trip[]}>(`${apiEndpoint}/trips/future`)
      .subscribe(response => {
        this.trips = response.trips
        this.isLoaded = true
      })
  }


  protected readonly dayjs = dayjs;
  protected readonly constants = constants;
  protected readonly apiEndpoint = apiEndpoint;
    protected readonly JSON = JSON;
}

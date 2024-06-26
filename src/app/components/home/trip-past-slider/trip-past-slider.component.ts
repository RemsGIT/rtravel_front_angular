import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import { HttpClient } from "@angular/common/http";
import {Trip} from "../../../../models/trip.model";
import {apiEndpoint, constants} from "../../../constants";
import dayjs from 'dayjs';

import {RouterLink} from "@angular/router";
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {TagTripSharedComponent} from "../../trip/utils/tag-trip-shared/tag-trip-shared.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-trip-past-slider',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    CardModule,
    TagModule,
    TooltipModule,
    TagTripSharedComponent,
    NgOptimizedImage
  ],
  templateUrl: './trip-past-slider.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TripPastSliderComponent implements OnInit{
  private http = inject(HttpClient)

  trips: Trip[] | null = null

  isLoaded = false

  swiperBreakpoints = {
    750: {
      slidesPerView: 4.3
    },
  }

  ngOnInit(): void {
    this.http.get<{trips: Trip[]}>(`${apiEndpoint}/trips/past`)
      .subscribe(response => {
          this.trips = response.trips
        this.isLoaded = true
      })
  }


  protected readonly dayjs = dayjs;
  protected readonly Math = Math;
  protected readonly constants = constants;
  protected readonly apiEndpoint = apiEndpoint;
    protected readonly JSON = JSON;
}

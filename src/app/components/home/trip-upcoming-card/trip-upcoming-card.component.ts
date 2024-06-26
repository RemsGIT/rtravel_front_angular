import {Component, OnInit, inject} from '@angular/core';
import {Trip} from "../../../../models/trip.model";
import { HttpClient } from "@angular/common/http";
import {apiEndpoint, constants} from "../../../constants";
import {RouterLink} from "@angular/router";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import dayjs from "dayjs";
import {LucideAngularModule} from "lucide-angular";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {TagTripSharedComponent} from "../../trip/utils/tag-trip-shared/tag-trip-shared.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-trip-upcoming-card',
  standalone: true,
  imports: [
    RouterLink,
    CardModule,
    ButtonModule,
    LucideAngularModule,
    TagModule,
    TooltipModule,
    TagTripSharedComponent,
    NgOptimizedImage
  ],
  templateUrl: './trip-upcoming-card.component.html',
})
export class TripUpcomingCardComponent implements OnInit {
  private http = inject(HttpClient)

  trip: Trip | undefined = undefined

  year: string | undefined

  totalPayments: number = 0

  ngOnInit() {
    if(typeof localStorage !== 'undefined') {
      this.http.get<{trip: Trip}>(`${apiEndpoint}/trips/current`)
        .subscribe(response => {
          if(!!response.trip) {
            this.trip = response.trip
            this.year = new Date(response.trip.start).getUTCFullYear().toString()

            if(response.trip.payments) {
              this.totalPayments = response.trip.payments.reduce((acc, item) => acc + item.amount, 0)
            }
          }
        })
    }

  }

  protected readonly dayjs = dayjs;
  protected readonly constants = constants;
  protected readonly apiEndpoint = apiEndpoint;
}

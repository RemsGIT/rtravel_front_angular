import {Component, OnInit, inject} from '@angular/core';
import {Trip} from "../../../../models/trip.model";
import {HttpClient} from "@angular/common/http";
import {apiEndpoint} from "../../../constants";
import {RouterLink} from "@angular/router";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import dayjs from "dayjs";
import {LucideAngularModule} from "lucide-angular";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {TagTripSharedComponent} from "../../trip/utils/tag-trip-shared/tag-trip-shared.component";

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
    TagTripSharedComponent
  ],
  templateUrl: './trip-upcoming-card.component.html',
})
export class TripUpcomingCardComponent implements OnInit {
  private http = inject(HttpClient)

  trip: Trip | undefined = undefined

  year: string | undefined

  ngOnInit() {
    if(typeof localStorage !== 'undefined') {
      this.http.get<{trip: Trip}>(`${apiEndpoint}/trips/current`)
        .subscribe(response => {
          if(!!response.trip) {
            this.trip = response.trip
            this.year = new Date(response.trip.start).getUTCFullYear().toString()
          }
        })
    }

  }

  protected readonly dayjs = dayjs;
}

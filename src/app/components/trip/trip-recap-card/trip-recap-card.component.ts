import { Component } from '@angular/core';
import {TripService} from "../../../services/trip/trip.service";
import {LucideAngularModule} from "lucide-angular";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-trip-recap-card',
  standalone: true,
  imports: [
    LucideAngularModule,
    CardModule
  ],
  templateUrl: './trip-recap-card.component.html',
})
export class TripRecapCardComponent {

  constructor(protected tripService: TripService) { }

  protected readonly dayjs = dayjs;
  protected readonly fr = fr;

}

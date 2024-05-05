import {Component, inject, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {TripService} from "../../../../services/trip/trip.service";
import dayjs from "dayjs";
import {Activity, listTypesIcons} from "../../../../../models/trip.model";
import fr from "dayjs/locale/fr";

@Component({
  selector: 'app-trip-widget-next-activity',
  standalone: true,
  imports: [
    LucideAngularModule,
    CardModule,
    ButtonModule,
    CalendarModule,
  ],
  templateUrl: './trip-widget-next-activity.component.html',
})
export class TripWidgetNextActivityComponent implements OnInit{

  tripService = inject(TripService)

  nextActivity: Activity | undefined

  ngOnInit(): void {
    const currentDate = dayjs();

    if(this.tripService.tripSelected()?.activities) {
      const activities = this.tripService.tripSelected()?.activities as Activity[]
      const closestActivity = this.tripService.tripSelected()?.activities?.filter(activity => dayjs(activity.start).isAfter(currentDate))
        .reduce((closest, activity) =>
          dayjs(activity.start).isBefore(dayjs(closest.start)) ? activity : closest, activities[0]);

      this.nextActivity = closestActivity
    }

  }

  getIconByType(icon: string) {
    const selectedType = listTypesIcons.find(lt => lt.code === icon)

    if(selectedType) {
      return selectedType.icon
    }

    return "plane"
  }


  protected readonly dayjs = dayjs;
  protected readonly fr = fr;
}

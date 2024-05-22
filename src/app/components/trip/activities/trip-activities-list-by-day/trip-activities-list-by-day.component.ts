import {AfterViewInit, Component, effect, inject, input, Input, OnInit} from '@angular/core';
import {TripService} from "../../../../services/trip/trip.service";
import dayjs from 'dayjs';

import {LucideAngularModule} from "lucide-angular";
import {ArrowComponent} from "../../../utils/arrow/arrow.component";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {CreateActivityBtnComponent} from "../create-activity-btn/create-activity-btn.component";
import {ActivityDropdownActionsComponent} from "../activity-dropdown-actions/activity-dropdown-actions.component";
import {listTypesIcons} from "../../../../../models/trip.model";

@Component({
  selector: 'app-trip-activities-list-by-day',
  standalone: true,
  imports: [
    LucideAngularModule,
    ArrowComponent,
    CreateActivityBtnComponent,
    CardModule,
    ButtonModule,
    ActivityDropdownActionsComponent
  ],
  templateUrl: './trip-activities-list-by-day.component.html',
})
export class TripActivitiesListByDayComponent implements AfterViewInit{
  protected readonly dayjs = dayjs;

  tripService = inject(TripService)

  date = input.required<Date>()

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById("btn-create-activity-floating")?.classList.remove('hidden')
    }, 250)
  }

  protected filterActivitesByDate(date: Date | undefined) {
    const filteredActivities = this.tripService.tripSelected()?.activities?.filter(activity => {
      const activityDate = dayjs(activity.start).format('YYYY-MM-DD');
      const selectedDate = dayjs(date).format('YYYY-MM-DD');

      return dayjs(activityDate).isSame(selectedDate)
    });

    filteredActivities?.sort((a, b) => {
      const dateA = dayjs(a.start);
      const dateB = dayjs(b.start);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    });

    return filteredActivities;
  }


  getIconByType(icon: string) {
    const selectedType = listTypesIcons.find(lt => lt.code === icon)

    if(selectedType) {
      return selectedType.icon
    }

    return "plane"
  }

}

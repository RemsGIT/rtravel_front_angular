import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, ViewChild} from '@angular/core';

import {
  TripWidgetNextActivityComponent
} from "../../preview/trip-widget-next-activity/trip-widget-next-activity.component";
import {TripService} from "../../../../services/trip/trip.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {TripActivitiesListByDayComponent} from "../trip-activities-list-by-day/trip-activities-list-by-day.component";
import dayjs from "dayjs";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-trip-activities-date-tabs',
  standalone: true,
  imports: [
    TripWidgetNextActivityComponent,
    TripActivitiesListByDayComponent,
    ButtonModule
  ],
  templateUrl: './trip-activities-date-tabs.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(5px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
    ])
  ]
})
export class TripActivitiesDateTabsComponent implements OnInit{
  private tripService = inject(TripService)

  dates: string[] = []
  selectedTab: string = ""

  @ViewChild('swiper') swiper: any;

  swiperBreakpoints = {
      450: {
        slidesPerView: 5.1
      },
      600: {
        slidesPerView: 6.2
      },
      750: {
        slidesPerView: 7.5
      },
      1100: {
        slidesPerView: 10.5
      },
      1400: {
        slidesPerView: 14.5
      },
  }

  onChangeTab(tab: string) {
    this.selectedTab = tab
  }

  ngOnInit(): void {
    const dates = [];
    const selectedTrip = this.tripService.tripSelected();

    if (selectedTrip) {
      let startDateTime = new Date(selectedTrip.start);
      let endDateTime = new Date(selectedTrip.end);

      let currentDate = new Date(Date.UTC(startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate()));
      let endDate = new Date(Date.UTC(endDateTime.getFullYear(), endDateTime.getMonth(), endDateTime.getDate()));

      while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      }

      this.dates = dates;
      const currentIndex = dates.findIndex(date => date === new Date().toISOString().split('T')[0]);


      this.selectedTab = currentIndex !== -1 ? dates[currentIndex] : dates[0];
    }
  }

  protected readonly dayjs = dayjs;
  protected readonly JSON = JSON;
}

import {Component, Inject, PLATFORM_ID} from '@angular/core';

import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";

import {
  TripWidgetNextActivityComponent
} from "../preview/trip-widget-next-activity/trip-widget-next-activity.component";
import {
  TripActivitiesDateTabsComponent
} from "../activities/trip-activities-date-tabs/trip-activities-date-tabs.component";
import {ParticipantsListComponent} from "../participants/participants-list/participants-list.component";
import {TabViewChangeEvent, TabViewModule} from "primeng/tabview";
import {ActivatedRoute, Router} from "@angular/router";
import {TripWidgetTicketsComponent} from "../preview/trip-widget-tickets/trip-widget-tickets.component";
import {UpdateTripSettingsComponent} from "../settings/update-trip-settings/update-trip-settings.component";
import {BudgetCircleRecapChartComponent} from "../budget/budget-circle-recap-chart/budget-circle-recap-chart.component";
import {BudgetTripComponent} from "../budget/budget-trip/budget-trip.component";
import {WidgetMapComponent} from "../preview/widget-map/widget-map.component";
import {isPlatformBrowser} from "@angular/common";


type Tabs = "preview" | "activities" | "participants" | "budget"


@Component({
  selector: 'app-trip-navigation-tabs',
  standalone: true,
  imports: [
    TripWidgetNextActivityComponent,
    TripActivitiesDateTabsComponent,
    ParticipantsListComponent,
    TabViewModule,
    TripWidgetTicketsComponent,
    UpdateTripSettingsComponent,
    BudgetCircleRecapChartComponent,
    BudgetTripComponent,
    WidgetMapComponent
  ],
  templateUrl: './trip-navigation-tabs.component.html',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(5px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
    ])
  ]
})
export class TripNavigationTabsComponent {
  activeIndex: number = 0

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const tabParam = params['tab'];
      if (tabParam) {
        this.activeIndex = parseInt(tabParam);
      }
    });
  }


  onChangeTab(event: TabViewChangeEvent) {
    this.activeIndex = event.index

    const newUrl = this.updateQueryStringParameter(window.location.href, 'tab', event.index.toString());
    window.history.replaceState({ path: newUrl }, '', newUrl);
  }

  private updateQueryStringParameter(uri: string, key: string, value: string): string {
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }

  protected readonly isPlatformBrowser = isPlatformBrowser;
}

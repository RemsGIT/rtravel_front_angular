import {Component, OnInit, inject} from '@angular/core';
import {TabMenuModule} from "primeng/tabmenu";
import {BudgetTripComponent} from "../../trip/budget/budget-trip/budget-trip.component";
import {ParticipantsListComponent} from "../../trip/participants/participants-list/participants-list.component";
import {TabViewModule} from "primeng/tabview";
import {
  TripActivitiesDateTabsComponent
} from "../../trip/activities/trip-activities-date-tabs/trip-activities-date-tabs.component";
import {
  TripWidgetNextActivityComponent
} from "../../trip/preview/trip-widget-next-activity/trip-widget-next-activity.component";
import {UpdateTripSettingsComponent} from "../../trip/settings/update-trip-settings/update-trip-settings.component";
import {ProfileStatisticsComponent} from "../profile-statistics/profile-statistics.component";
import { AuthService } from '../../../services/auth/auth.service';
import {FormsModule} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../../models/auh.model';
import { apiEndpoint } from '../../../constants';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {toast} from "ngx-sonner";



type Tabs = "general" | "settings"

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [
    TabMenuModule,
    BudgetTripComponent,
    ParticipantsListComponent,
    TabViewModule,
    TripActivitiesDateTabsComponent,
    TripWidgetNextActivityComponent,
    UpdateTripSettingsComponent,
    ProfileStatisticsComponent,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './profile-tabs.component.html',
  styleUrl: 'profile-tabs.scss'
})
export class ProfileTabsComponent implements OnInit {
  authService = inject(AuthService)
  http = inject(HttpClient)

  username: string = ""

  isSubmitting = false


  ngOnInit() {
    this.http.get<IUser>(`${apiEndpoint}/auth/me`)
        .subscribe({
          next: (response) => {
            this.username = response.username ?? ''
          }
        })
  }

  onChangeUsername() {
    if(this.username !== this.authService.currentUserSig()?.username) {
      this.isSubmitting = true
      this.http.patch<{username: string}>(`${apiEndpoint}/user`, {username: this.username})
        .subscribe({
          next: (response) => {
            this.isSubmitting = false
            this.authService.currentUserSig.set({...this.authService.currentUserSig() as IUser, username: response.username})

            toast.success("Nom d'utilisateur modifié")
          },
          error : e => {
            console.log(e)
          }
        })
    }

  }
}

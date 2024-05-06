import {Component, inject, input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {LucideAngularModule} from "lucide-angular";
import {Activity} from "../../../../../models/trip.model";
import {CreateActivityBtnComponent} from "../create-activity-btn/create-activity-btn.component";
import {EditActivityBtnComponent} from "../edit-activity-btn/edit-activity-btn.component";
import {TripService} from "../../../../services/trip/trip.service";
import {toast} from "ngx-sonner";
import {constants} from "../../../../constants";

@Component({
  selector: 'app-activity-dropdown-actions',
  standalone: true,
  imports: [
    MenuModule,
    ButtonModule,
    LucideAngularModule,
    CreateActivityBtnComponent,
    EditActivityBtnComponent
  ],
  templateUrl: './activity-dropdown-actions.component.html',
})
export class ActivityDropdownActionsComponent implements OnInit{
  tripService = inject(TripService)

  items: MenuItem[] | undefined;

  sidebarEditOpen: boolean = false
  activity = input.required<Activity>()

  ngOnInit() {
    this.items = [
      {
        label: 'Modifier',
        icon: 'pencil',
        command: () => {
          this.sidebarEditOpen = true
        }
      },
      {
        label: 'GPS',
        icon: 'map',
        disabled: !this.activity().latitude || !this.activity().longitude,
        command: () => {
          if(this.activity().latitude && this.activity().longitude) {
            window.open(`maps://maps.google.com/?q=${this.activity().latitude},${this.activity().longitude}`);
          }
        }
      },
      {
        separator: true
      },
      {
        label: 'Supprimer',
        icon: 'trash',
        command: () => {
          this.tripService.deleteActivity(this.activity().id)
            .subscribe({
              next: (response) => {
                const trip = this.tripService.tripSelected();

                // Remove activity to list
                if (trip && trip.activities) {
                  const index = trip.activities.findIndex(activity => activity.id === this.activity().id);
                  if (index !== -1) {
                    trip.activities.splice(index, 1);
                    this.tripService.tripSelected.set(trip);
                  }
                }
              },
              error: (e) => {
                toast.error(constants.messages.ERROR_DELETE)
              }
            })
        }
      }
    ];
  }
}

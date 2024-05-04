import { Component } from '@angular/core';
import {UpdateTripInformationsComponent} from "../update-trip-informations/update-trip-informations.component";
import {ButtonModule} from "primeng/button";
import {ConfirmationService} from "primeng/api";
import {TripService} from "../../../../services/trip/trip.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {LucideAngularModule} from "lucide-angular";
import {toast} from "ngx-sonner";
import {constants} from "../../../../constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-trip-settings',
  standalone: true,
  imports: [
    UpdateTripInformationsComponent,
    ConfirmDialogModule,
    ButtonModule,
    LucideAngularModule
  ],
  providers: [ConfirmationService],
  templateUrl: './update-trip-settings.component.html',
})
export class UpdateTripSettingsComponent {

  constructor(private confirmationService: ConfirmationService, private tripService: TripService, private router: Router) {}


  confirmDelete() {
    this.confirmationService.confirm({
      header: "Êtes-vous sûr ?",
      message: 'Supprimer un voyage supprimera toutes les données associés à celui-ci',
      accept: () => {
        toast.loading('Suppression en cours')

        this.tripService.deleteTrip(this.tripService.tripSelected()?.id as number)
          .subscribe({
            next: response => {
              setTimeout(() => {
                toast.dismiss()
                toast.success(constants.messages.trip.SUCCESS_DELETE)

                this.router.navigateByUrl("/accueil")
              }, 600)
            },
            error: e => {
              toast.dismiss()
              if(e.status === 400) {
                if(e.error.error === "NOT_AUTHORIZED") {
                  toast.warning(constants.messages.trip.ERROR_DELETE_NOT_OWNER)
                  return
                }
              }
              toast.error(constants.messages.ERROR_UPDATE)
            }
          })
      }
    })
  }

}

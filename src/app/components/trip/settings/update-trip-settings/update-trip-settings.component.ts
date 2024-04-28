import { Component } from '@angular/core';
import {UpdateTripInformationsComponent} from "../update-trip-informations/update-trip-informations.component";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-update-trip-settings',
  standalone: true,
  imports: [
    UpdateTripInformationsComponent,
    ButtonModule
  ],
  templateUrl: './update-trip-settings.component.html',
})
export class UpdateTripSettingsComponent {

}

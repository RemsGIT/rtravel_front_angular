import { Component } from '@angular/core';
import {FormCreateTripComponent} from "../../components/forms/form-create-trip/form-create-trip.component";

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [
    FormCreateTripComponent
  ],
  templateUrl: './create-trip.component.html',
})
export class CreateTripComponent {

}

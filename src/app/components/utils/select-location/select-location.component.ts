import {Component, inject, input, OnInit, output} from '@angular/core';
import {GooglePlacesService} from "../../../services/google/google-places.service";
import {TripService} from "../../../services/trip/trip.service";
import {GooglePlaceOption} from "../../../../models/google.model";
import {AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-select-location',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule
  ],
  templateUrl: './select-location.component.html',
})
export class SelectLocationComponent implements OnInit{
  tripService = inject(TripService)
  googlePlacesService =  inject(GooglePlacesService)

  predictions: string[] = []

  isError = input<boolean>(false)
  defaultValue = input<string | undefined>()
  onValueChange = output<string>()

  ngOnInit() {
    if(!!this.defaultValue()) {
      this.predictions.push(this.defaultValue() as string)
    }
  }

  filterResult(event: AutoCompleteCompleteEvent) {
    this.googlePlacesService.searchCitiesByText(event.query)
      .then(response => {
        this.predictions = Array.from(new Set(response.map(prediction => prediction)));
      })
  }

  onChange(event: AutoCompleteSelectEvent) {
    this.onValueChange.emit(event.value)
  }
}

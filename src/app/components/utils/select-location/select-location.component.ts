import {Component, inject, input, OnInit, output} from '@angular/core';
import {GooglePlacesService, PlaceResult} from "../../../services/google/google-places.service";
import {TripService} from "../../../services/trip/trip.service";
import {GooglePlaceOption} from "../../../../models/google.model";
import {AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {TagModule} from "primeng/tag";


type type = "city" | "country" | "country_city"


@Component({
  selector: 'app-select-location',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule,
    TagModule
  ],
  templateUrl: './select-location.component.html',
})
export class SelectLocationComponent implements OnInit {
  tripService = inject(TripService)
  googlePlacesService = inject(GooglePlacesService)

  predictions: PlaceResult[] = []

  typeLocation = input<type>("city")
  isError = input<boolean>(false)
  defaultValue = input<string | undefined>()
  onValueChange = output<PlaceResult>()

  ngOnInit() {
    if (!!this.defaultValue()) {
      this.predictions.push({value: this.defaultValue() as string})
    }
  }

  filterResult(event: AutoCompleteCompleteEvent) {
    switch (this.typeLocation()) {
      case 'city':
        this.googlePlacesService.searchCitiesByText(event.query)
          .then(response => {
            this.predictions = response.map(prediction => ({value: prediction.value}));
          })
        break;
      case 'country_city':
        this.googlePlacesService.searchCountriesAndCitiesByText(event.query)
          .then(response => {
            this.predictions = response.map(prediction => ({
              value: prediction.value,
              countryCode: prediction.countryCode,
              type: prediction.type,
              latitude: prediction.latitude,
              longitude: prediction.longitude
            }));
          })
        break;
    }

  }

  onChange(event: AutoCompleteSelectEvent) {
    this.onValueChange.emit(event.value)
  }
}

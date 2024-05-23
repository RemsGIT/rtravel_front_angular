import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {LucideAngularModule} from "lucide-angular";
import {SelectLocationComponent} from "../../utils/select-location/select-location.component";
import {CalendarModule} from "primeng/calendar";
import confetti from "canvas-confetti";
import {animate, style, transition, trigger} from "@angular/animations";
import {toast} from "ngx-sonner";
import {constants} from "../../../constants";
import {TripService} from "../../../services/trip/trip.service";
import dayjs from "dayjs";
import {Router, RouterLink} from "@angular/router";
import {CountryVisitedService} from "../../../services/country-visited/country-visited.service";

type StepType = "name" | "city" | "dates"

@Component({
  selector: 'app-form-create-trip',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    LucideAngularModule,
    SelectLocationComponent,
    CalendarModule,
    RouterLink
  ],
  templateUrl: './form-create-trip.component.html',
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ])
  ]
})
export class FormCreateTripComponent {
  tripForm!: FormGroup

  step: StepType  = "name"
  isSubmitting = false

  endMinDate = undefined
  now = new Date()

  constructor(private fb: FormBuilder, private tripService: TripService, private countryVisitedService: CountryVisitedService, private router: Router) {
    this.tripForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      start: new FormControl(undefined, [Validators.required]),
      end: new FormControl(undefined, [Validators.required]),
      countryCode: new FormControl('', [Validators.required]),
      latitude: new FormControl(undefined),
      longitude: new FormControl(undefined)
    })
  }

  onChangeStep(step: StepType) { this.step = step }

  goToNextStep() {
    switch (this.step) {
      case 'name': this.step = 'city'; break;
      case 'city': this.step = 'dates'; break;
      case 'dates': {
        this.onSubmit()
        break;
      }
    }
  }
  goToPreviousStep() {
    switch (this.step) {
      case 'city': this.step = 'name'; break;
      case 'dates': this.step = 'city'; break;
    }
  }

  onSubmit() {
    if(this.tripForm.valid) {
      this.isSubmitting = true

      this.tripForm.patchValue({
        'start' : dayjs( this.tripForm.get('start')?.value).format('YYYY-MM-DD HH:mm:ss'),
        'end' : dayjs( this.tripForm.get('end')?.value).format('YYYY-MM-DD HH:mm:ss')
      })
      this.tripService.persistTrip(this.tripForm.value)
        .subscribe({
          next: response => {
            this.isSubmitting = false
            this.router.navigateByUrl(`/voyage/${response.id}`)

            toast.success(constants.messages.trip.SUCCESS_CREATE)

            confetti({
              particleCount: 100,
              spread: 160,
              origin: { y: 0.5 },
            });

            // Set the country as visited -> will returns '400' if already exists
            this.countryVisitedService.persistCountryVisited(response.countryCode).subscribe()
          },
          error: err => {
            this.isSubmitting = false

            toast.error(constants.messages.ERROR_CREATE)
          }
        })
    }
    else {
      //this.tripForm.markAllAsTouched()
      this.checkErrors()
    }
  }

  checkErrors() {
   if(this.tripForm.get('name')?.errors) {
     toast.error('Donne un nom à ton voyage')
     this.step = "name"
   }
   else if(this.tripForm.get('city')?.errors) {
     toast.error('Entre la destination du voyage')
     this.step = "city"
   }
   else if(this.tripForm.get('start')?.errors) {
     toast.error('Entre la date de début du voyage')
     this.step = "dates"
   }
   else if(this.tripForm.get('end')?.errors) {
     toast.error('Entre la date de fin du voyage')
     this.step = "dates"
   }
   else {
     toast.error(constants.messages.ERROR_GENERIC)
   }
  }

  onChangeStartDate() {
    if(this.tripForm.get('start')?.value) {
      this.endMinDate = this.tripForm.get('start')?.value
    }

    // Check if end date is set and check if < start date
    if(this.tripForm.get('end')?.value) {
      const startDate = dayjs(this.tripForm.get('start')?.value);
      const endDate = dayjs(this.tripForm.get('end')?.value);

      if(endDate.isBefore(startDate)) {
        this.tripForm.patchValue({end: undefined})
      }
    }
  }

  protected readonly Date = Date;
}

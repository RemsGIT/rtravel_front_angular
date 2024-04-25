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
    CalendarModule
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

  constructor(private fb: FormBuilder) {
    this.tripForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      start: new FormControl(undefined, [Validators.required]),
      end: new FormControl(undefined, [Validators.required]),
      countryCode: new FormControl('', [Validators.required]),
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
    console.log(this.tripForm.value)
    if(this.tripForm.valid) {
      console.log('valid -- submit')
      confetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.5 },
      });

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
}

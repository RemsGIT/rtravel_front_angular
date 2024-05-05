import {Component, input, OnInit, output} from '@angular/core';
import {toast} from "ngx-sonner";
import {constants} from "../../../constants";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TripService} from "../../../services/trip/trip.service";
import dayjs from 'dayjs';
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {Activity, listTypesIcons} from "../../../../models/trip.model";
import fr from "dayjs/locale/fr";
import {SelectLocationComponent} from "../../utils/select-location/select-location.component";

@Component({
  selector: 'app-form-activity',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    SelectLocationComponent
  ],
  templateUrl: './form-activity.component.html',
})
export class FormActivityComponent implements OnInit{
  protected isSubmitting: boolean = false;
  protected readonly dayjs = dayjs;
  activityForm!: FormGroup

  selectedDate = input<Date>();
  activityToEdit = input<Activity>()

  onSubmitSuccess = output()

  constructor(private fb: FormBuilder, private tripService: TripService) {
    this.activityForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      place: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      start: new FormControl(undefined, [Validators.required]),
      icon: new FormControl('')
    })
  }

  ngOnInit(): void {
    if(this.selectedDate()) {
      this.activityForm.patchValue({
      // @ts-ignore
        start : new Date(this.selectedDate().setHours(10,0,0))
      })
    }
    else if(this.activityToEdit()) {

      const selectedType = listTypesIcons.find(lt => lt.code === this.activityToEdit()?.icon)

      this.activityForm.patchValue({
        name: this.activityToEdit()?.name,
        city: this.activityToEdit()?.city,
        place: this.activityToEdit()?.place,
        icon: this.activityToEdit()?.icon,
        type: selectedType,
        //@ts-ignore
        start: new Date(this.activityToEdit()?.start),

      })
    }
  }

  onSubmit() {
    if(this.activityForm.valid) {
      this.isSubmitting = true

      this.activityForm.patchValue({
        'icon' : this.activityForm.get('type')?.value?.code,
        'start' : dayjs( this.activityForm.get('start')?.value).format('YYYY-MM-DD HH:mm:ss'),
        'city' : typeof this.activityForm.get('city')?.value === 'object' ? this.activityForm.get('city')?.value.value : this.activityForm.get('city')?.value
      })

      if(!this.activityToEdit()) {
        this.tripService.persistActivity(this.activityForm.value)
          .subscribe({
            next: (response: Activity) => {
              this.isSubmitting = false
              this.onSubmitSuccess.emit()

              // Add new activity to list
              const trip = this.tripService.tripSelected()
              trip?.activities?.push(response)
              this.tripService.tripSelected.set(trip)

              toast.success(constants.messages.activity.SUCCESS_CREATE)
              this.activityForm.reset()

              setTimeout(() => {
                document.getElementById("btn-create-activity-floating")?.classList.remove('hidden')
              }, 200)
            },
            error: (e: any) => {
              this.isSubmitting = false
              if(e.status === 400) {
                if(e.error.error === "NOT_AUTHORIZED") {
                  toast.warning(constants.messages.ERROR_NEED_WRITE)
                  return
                }
              }
              toast.error(constants.messages.ERROR_CREATE)
            },
          })
      }
      else {
        this.tripService.updateActivity(this.activityForm.value, this.activityToEdit()?.id as number)
          .subscribe({
            next: (response: Activity) => {
              this.onSubmitSuccess.emit()

              // Fix utc bug
              response.start = new Date(dayjs(response.start).locale(fr).format('YYYY-MM-DD HH:mm:ss'))

              // Update activity
              const trip = this.tripService.tripSelected()
              if (trip && trip.activities) {
                const index = trip.activities.findIndex(activity => activity.id === response.id);
                if (index !== -1) {
                  trip.activities[index] = response;
                  this.tripService.tripSelected.set(trip);
                }
              }

              toast.success(constants.messages.activity.SUCCESS_UPDATE)
              this.activityForm.reset()
            },
            error: (e: any) => {
              this.isSubmitting = false
              if(e.status === 400) {
                if(e.error.error === "NOT_AUTHORIZED") {

                  toast.warning(constants.messages.ERROR_NEED_WRITE)
                  return
                }
              }
              toast.error(constants.messages.ERROR_UPDATE)
            },
            complete: () => this.isSubmitting = false
          })
      }
    }
    else {
      this.activityForm.markAllAsTouched()
    }
  }

  protected readonly listTypesIcons = listTypesIcons;
}

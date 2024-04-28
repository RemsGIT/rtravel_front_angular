import {Component, inject} from '@angular/core';
import {CardModule} from "primeng/card";
import {TripService} from "../../../../services/trip/trip.service";
import {LucideAngularModule} from "lucide-angular";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import {animate, style, transition, trigger} from "@angular/animations";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {toast} from "ngx-sonner";
import {constants} from "../../../../constants";
import {SelectLocationComponent} from "../../../utils/select-location/select-location.component";
import {CalendarModule} from "primeng/calendar";
import {FileUploadModule} from "primeng/fileupload";

@Component({
  selector: 'app-update-trip-informations',
  standalone: true,
  imports: [
    CardModule,
    LucideAngularModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    SelectLocationComponent,
    CalendarModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  templateUrl: './update-trip-informations.component.html',
  styleUrl: './update-trip-informations.scss',
  animations: [
    trigger('slideInRight', [
    transition(':enter', [
      style({ transform: 'translateX(100%)' }),
      animate('150ms ease-out', style({ transform: 'translateX(0)' })),
    ]),
    transition(":leave", [
      animate('150ms ease-out', style({ transform: 'translateX(100%)' })),
    ])
  ])
],
})
export class UpdateTripInformationsComponent {
  tripService = inject(TripService)
  protected readonly dayjs = dayjs;
  protected readonly fr = fr;

  is_submitting = false
  edit_name_visible = false;
  edit_city_visible = false;
  edit_start_visible = false;
  edit_end_visible = false;
  edit_thumbnail_visible = false
  edit_cover_visible = false


  name = this.tripService.tripSelected()?.name
  city: {city: string, countryCode: string} = {city: this.tripService.tripSelected()?.city ?? '', countryCode: this.tripService.tripSelected()?.countryCode ?? ''}
  start = new Date(this.tripService.tripSelected()?.start as Date)
  end = new Date(this.tripService.tripSelected()?.end as Date)
  thumbnail: File | undefined
  cover: File | undefined


  onChangeName() {
    this.is_submitting = true
    this.tripService.updateTrip({name: this.name}, this.tripService.tripSelected()?.id as number)
      .subscribe({
        next: response => {
          this.is_submitting = false
          this.edit_name_visible = false
          this.tripService.tripSelected.set(response)
          toast.success(constants.messages.trip.SUCCESS_UPDATE)
        },
        error: e => {
          this.is_submitting = false
          if(e.status === 400) {
            if(e.error.error === "NOT_AUTHORIZED") {
              toast.warning(constants.messages.ERROR_NEED_WRITE)
              return
            }
          }
          toast.error(constants.messages.ERROR_UPDATE)
        }
      })
  }

  onChangeCity() {
    this.is_submitting = true
    this.tripService.updateTrip({city: this.city.city, countryCode: this.city.countryCode}, this.tripService.tripSelected()?.id as number)
      .subscribe({
        next: response => {
          this.is_submitting = false
          this.edit_city_visible = false
          this.tripService.tripSelected.set(response)
          toast.success(constants.messages.trip.SUCCESS_UPDATE)
        },
        error: e => {
          this.is_submitting = false
          if(e.status === 400) {
            if(e.error.error === "NOT_AUTHORIZED") {
              toast.warning(constants.messages.ERROR_NEED_WRITE)
              return
            }
          }
          toast.error(constants.messages.ERROR_UPDATE)
        }
      })
  }

  onChangeStart() {

    // Check if start is before the end
    if(dayjs(this.start).isAfter(dayjs(this.tripService.tripSelected()?.end))) {
      toast.error("La date de début doit être avant la date de fin")
      return
    }


    this.is_submitting = true
    this.tripService.updateTrip({start: dayjs( this.start).format('YYYY-MM-DD')}, this.tripService.tripSelected()?.id as number)
      .subscribe({
        next: response => {
          this.is_submitting = false
          this.edit_start_visible = false
          this.tripService.tripSelected.set(response)
          toast.success(constants.messages.trip.SUCCESS_UPDATE)
        },
        error: e => {
          this.is_submitting = false
          if(e.status === 400) {
            if(e.error.error === "NOT_AUTHORIZED") {
              toast.warning(constants.messages.ERROR_NEED_WRITE)
              return
            }
          }
          toast.error(constants.messages.ERROR_UPDATE)
        }
      })
  }

  onChangeEnd() {
    // Check if start is before the end
    if(dayjs(this.end).isBefore(dayjs(this.tripService.tripSelected()?.start))) {
      toast.error("La date de fin doit être après la date de début")
      return
    }


    this.is_submitting = true
    this.tripService.updateTrip({end: dayjs(this.end).format('YYYY-MM-DD')}, this.tripService.tripSelected()?.id as number)
      .subscribe({
        next: response => {
          console.log(response)
          this.is_submitting = false
          this.edit_end_visible = false
          this.tripService.tripSelected.set(response)
          toast.success(constants.messages.trip.SUCCESS_UPDATE)
        },
        error: e => {
          this.is_submitting = false
          if(e.status === 400) {
            if(e.error.error === "NOT_AUTHORIZED") {
              toast.warning(constants.messages.ERROR_NEED_WRITE)
              return
            }
          }
          toast.error(constants.messages.ERROR_UPDATE)
        }
      })
  }

  onChangeThumbnail() {
    this.is_submitting = true

    const formData = new FormData()
    formData.append('thumbnail', this.thumbnail as File)

    console.log(this.thumbnail)

    this.tripService.updateTrip(formData, this.tripService.tripSelected()?.id as number)
      .subscribe({
        next: response => {
          this.is_submitting = false
          this.edit_thumbnail_visible = false
          this.tripService.tripSelected.set(response)
          toast.success(constants.messages.trip.SUCCESS_UPDATE)
        },
        error: e => {
          this.is_submitting = false
          if(e.status === 400) {
            if(e.error.error === "NOT_AUTHORIZED") {
              toast.warning(constants.messages.ERROR_NEED_WRITE)
              return
            }
          }
          toast.error(constants.messages.ERROR_UPDATE)
        }
      })
  }

  onChangeCover() {
    this.is_submitting = true

    const formData = new FormData()
    formData.append('cover', this.cover as File)

    this.tripService.updateTrip(formData, this.tripService.tripSelected()?.id as number)
      .subscribe({
        next: response => {
          this.is_submitting = false
          this.edit_cover_visible = false
          this.tripService.tripSelected.set(response)
          toast.success(constants.messages.trip.SUCCESS_UPDATE)
        },
        error: e => {
          this.is_submitting = false
          if(e.status === 400) {
            if(e.error.error === "NOT_AUTHORIZED") {
              toast.warning(constants.messages.ERROR_NEED_WRITE)
              return
            }
          }
          toast.error(constants.messages.ERROR_UPDATE)
        }
      })
  }

  onChangeFileThumbnail(event: any) {
    this.thumbnail = event.target.files[0]
  }

  onChangeFileCover(event: any) {
    this.cover = event.target.files[0]
  }


}

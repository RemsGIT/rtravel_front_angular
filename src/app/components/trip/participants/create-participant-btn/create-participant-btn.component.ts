import {Component, output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SidebarModule} from "primeng/sidebar";
import {LucideAngularModule} from "lucide-angular";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TripService} from "../../../../services/trip/trip.service";
import {Participant} from "../../../../../models/participant.model";
import {ParticipantService} from "../../../../services/participant/participant.service";
import {toast} from "ngx-sonner";
import {constants} from "../../../../constants";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {IUser} from "../../../../../models/auh.model";

@Component({
  selector: 'app-create-participant-btn',
  standalone: true,
  imports: [
    ButtonModule,
    SidebarModule,
    LucideAngularModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './create-participant-btn.component.html',
})
export class CreateParticipantBtnComponent {
  protected sidebarVisible: boolean = false
  protected isSubmitting: boolean = false;

  onCreateParticipant = output<Participant>();


  participantForm!: FormGroup

  constructor(private fb: FormBuilder, private participantService: ParticipantService, private tripService: TripService) {
    this.participantForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      policy: new FormControl('read', [Validators.required]),
    })
  }

  onSubmit() {
    if(this.participantForm.valid) {
      this.isSubmitting = true

      this.participantService.persistParticipant(this.participantForm.getRawValue(), this.tripService.tripSelected()?.id as number)
        .subscribe({
          next: (response: Participant) => {
            this.onCreateParticipant.emit(response)

            toast.success(constants.messages.participant.SUCCESS_CREATE)
            this.sidebarVisible = false
            this.participantForm.reset()
            this.participantForm.controls['name'].enable()
            this.isSubmitting = false

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
      this.participantForm.markAllAsTouched()
    }
  }

  onEmailChange(email: any) {
    this.participantService.searchUserByEmail(this.participantForm.get('email')?.value)
      .subscribe({
        next: (response) => {
          if(response.email) {
            this.participantForm.patchValue({name: response.username} )
            this.participantForm.controls['name'].disable()
          }
        },
        error: err => { this.participantForm.controls['name'].enable() }
      })
  }
}

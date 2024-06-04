import {Component, input, OnInit, output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ParticipantService} from "../../../services/participant/participant.service";
import {TripService} from "../../../services/trip/trip.service";
import {Participant} from "../../../../models/participant.model";
import {toast} from "ngx-sonner";
import {constants} from "../../../constants";

@Component({
  selector: 'app-form-participant',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-participant.component.html',
})
export class FormParticipantComponent implements OnInit{

  protected isSubmitting: boolean = false;

  onSubmitParticipant = output<{action: 'create' | 'update', participant: Participant}>()

  participantForm!: FormGroup

  participantToEdit = input<Participant | undefined>()

  constructor(private fb: FormBuilder, private participantService: ParticipantService, private tripService: TripService) {
    this.participantForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      policy: new FormControl('read', [Validators.required]),
    })
  }

  async ngOnInit() {
    if (this.participantToEdit()) {
      this.participantForm.patchValue({
        name: this.participantToEdit()?.name,
        email: this.participantToEdit()?.email,
        policy: this.participantToEdit()?.policy
      })

      if (this.participantToEdit()?.email) {
        await this.onEmailChange()
      }
    }
  }
  BpGB2*tMxudYGAvwqGR4CRdMBMQM@L
  async onSubmit() {
    if (this.participantForm.valid) {
      this.isSubmitting = true

      if (!this.participantToEdit()) {
        this.participantService.persistParticipant(this.participantForm.getRawValue(), this.tripService.tripSelected()?.id as number)
          .subscribe({
            next: (response: Participant) => {
              this.onSubmitParticipant.emit({
                action: 'create',
                participant: response
              })

              this.participantForm.reset()
              this.participantForm.controls['name'].enable()
              this.isSubmitting = false

            },
            error: (e: any) => {
              this.isSubmitting = false
              if (e.status === 400) {
                if (e.error.error === "NOT_AUTHORIZED") {
                  toast.warning(constants.messages.ERROR_NEED_WRITE)
                  return
                } else if (e.error.error === "ALREADY_EXISTS") {
                  toast.warning(constants.messages.participant.ERROR_EXISTS)
                  return
                }
              }
              toast.error(constants.messages.ERROR_CREATE)
            },
          })
      } else {

        this.participantService.updateParticipant({
          ...this.participantForm.getRawValue(),
          id: this.participantToEdit()?.id
        }, this.tripService.tripSelected()?.id as number)
          .subscribe({
            next: (response: Participant) => {
              this.onSubmitParticipant.emit({
                action: 'update',
                participant: response
              })
              this.isSubmitting = false
            },
            error: (e: any) => {
              this.isSubmitting = false
              if (e.status === 400) {
                if (e.error.error === "NOT_AUTHORIZED") {
                  toast.warning(constants.messages.ERROR_NEED_WRITE)
                  return
                }
                else if (e.error.error === "ALREADY_EXISTS") {
                  toast.warning(constants.messages.participant.ERROR_EXISTS)
                  return
                }
              }
              toast.error(constants.messages.ERROR_CREATE)
            },
          })
      }

    } else {
      this.participantForm.markAllAsTouched()
    }
  }

  async onEmailChange() {
    this.participantService.searchUserByEmail(this.participantForm.get('email')?.value)
      .subscribe({
        next: (response) => {
          if (response.email) {
            this.participantForm.patchValue({name: response.username});
            this.participantForm.controls['name'].disable();
          }
        },
        error: err => {
          this.participantForm.controls['name'].enable();
        }
      })
  }
}

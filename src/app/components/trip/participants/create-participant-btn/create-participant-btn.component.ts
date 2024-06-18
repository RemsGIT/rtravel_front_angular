import {Component, output, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Sidebar, SidebarModule} from "primeng/sidebar";
import {LucideAngularModule} from "lucide-angular";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TripService} from "../../../../services/trip/trip.service";
import {Participant} from "../../../../../models/participant.model";
import {ParticipantService} from "../../../../services/participant/participant.service";
import {toast} from "ngx-sonner";
import {constants} from "../../../../constants";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {FormParticipantComponent} from "../../../forms/form-participant/form-participant.component";

@Component({
  selector: 'app-create-participant-btn',
  standalone: true,
  imports: [
    ButtonModule,
    SidebarModule,
    LucideAngularModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    FormParticipantComponent
  ],
  templateUrl: './create-participant-btn.component.html',
})
export class CreateParticipantBtnComponent {
  protected sidebarVisible: boolean = false
  protected isSubmitting: boolean = false;

  onCreateParticipant = output<Participant>();

  handleSubmit(newParticipant: Participant) {
    this.onCreateParticipant.emit(newParticipant)
    this.sidebarVisible = false
    toast.success(constants.messages.participant.SUCCESS_CREATE)
  }
}

import {Component, Input, input, output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FormParticipantComponent} from "../../../forms/form-participant/form-participant.component";
import {LucideAngularModule} from "lucide-angular";
import {SharedModule} from "primeng/api";
import {SidebarModule} from "primeng/sidebar";
import {Participant} from "../../../../../models/participant.model";
import {toast} from "ngx-sonner";
import {constants} from "../../../../constants";

@Component({
  selector: 'app-edit-participant-sidebar',
  standalone: true,
  imports: [
    ButtonModule,
    FormParticipantComponent,
    LucideAngularModule,
    SharedModule,
    SidebarModule
  ],
  templateUrl: './edit-participant-sidebar.component.html',
})
export class EditParticipantSidebarComponent {
  @Input()
  sidebarVisible = false

  @Input()
  ParticipantToEdit: Participant | undefined

  onEditParticipant = output<Participant>();
  onCloseSidebar = output()

  handleSubmit(editedParticipant: Participant) {
    this.onEditParticipant.emit(editedParticipant)
    toast.success(constants.messages.participant.SUCCESS_UPDATE)
  }
}

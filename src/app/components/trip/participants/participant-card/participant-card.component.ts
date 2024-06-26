import {Component, EventEmitter, Input, OnInit, Output, output} from '@angular/core';
import {Participant, ParticipantPolicy} from "../../../../../models/participant.model";
import { NgOptimizedImage } from "@angular/common";
import {CardModule} from "primeng/card";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MenuItem} from "primeng/api";
import {LucideAngularModule} from "lucide-angular";
import {constants} from "../../../../constants";
import {ParticipantService} from "../../../../services/participant/participant.service";
import {toast} from "ngx-sonner";
import {TripService} from "../../../../services/trip/trip.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {MenuModule} from "primeng/menu";

@Component({
  selector: 'app-participant-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CardModule,
    AvatarModule,
    ButtonModule,
    ConfirmDialogModule,
    LucideAngularModule,
    TagModule,
    TooltipModule,
    MenuModule,
  ],
  templateUrl: './participant-card.component.html',
})
export class ParticipantCardComponent {

  @Input()
  participant: Participant | undefined

  onDeleteParticipant = output<number>();
  onClickEditParticipant = output<Participant>()

  constructor(private confirmationService: ConfirmationService, protected authService: AuthService, private tripService: TripService, private participantService: ParticipantService) {}

  confirmDelete() {
    if(this.participant && (this.participant.email !== this.authService?.currentUserSig()?.email && !this.participant.isOwner)) {
      this.confirmationService.confirm({
        key: this.participant?.id.toString(),
        header: "Êtes-vous sûr ?",
        message: 'Supprimer un participant supprimera toutes les données associés à celui-ci',
        accept: () => {
          this.deleteParticipant()
        }
      })
    }
  }


  private deleteParticipant() {
    if(this.participant) {
      this.participantService.deleteParticipant(this.participant.id, this.tripService.tripSelected()?.id as number)
        .subscribe({
          next: (response) => {
            // update participants
            this.onDeleteParticipant.emit(this.participant?.id as number)
            toast.success(constants.messages.participant.SUCCESS_DELETE)
          },
          error: (e) => {
            toast.error(constants.messages.ERROR_DELETE)
          }
        })
    }
  }


  protected readonly ParticipantPolicy = ParticipantPolicy;
}

import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Participant, ParticipantPolicy} from "../../../../../models/participant.model";
import {apiEndpoint} from "../../../../constants";
import {TripService} from "../../../../services/trip/trip.service";

import {ParticipantCardComponent} from "../participant-card/participant-card.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {CreateParticipantBtnComponent} from "../create-participant-btn/create-participant-btn.component";
import {IUser} from "../../../../../models/auh.model";

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [
    ParticipantCardComponent,
    ConfirmDialogModule,
    CreateParticipantBtnComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './participants-list.component.html',
})
export class ParticipantsListComponent implements OnInit {
  private tripService = inject(TripService)
  private http = inject(HttpClient)

  participants: Participant[] | null = null

  tripOwner: Participant | undefined = undefined

  ngOnInit() {
    this.http.get<{ participants: Participant[], owner: IUser }>(`${apiEndpoint}/trips/${this.tripService.tripSelected()?.id}/participants`)
      .subscribe(response => {
        this.participants = response.participants

        if(response.owner) {
          this.tripOwner = {
            id: -1,
            name: response.owner.username,
            email: response.owner.email,
            policy: ParticipantPolicy.WRITE,
            tripId: this.tripService.tripSelected()?.id as number,
            createdAt: new Date(),
            isOwner: true
          }
        }
      })
  }

  protected handleRemoveParticipantFromList(id: number) {
    if(this.participants) {
      this.participants = this.participants.filter(participant => participant.id !== id);
    }
  }

  protected handleCreateParticipantFromList(participant: Participant) {
    if(this.participants) {
      this.participants.push(participant)
    }
  }
}

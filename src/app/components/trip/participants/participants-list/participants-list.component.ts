import {Component, inject, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Participant, ParticipantPolicy} from "../../../../../models/participant.model";
import {apiEndpoint, constants} from "../../../../constants";
import {TripService} from "../../../../services/trip/trip.service";

import {ParticipantCardComponent} from "../participant-card/participant-card.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {CreateParticipantBtnComponent} from "../create-participant-btn/create-participant-btn.component";
import {IUser} from "../../../../../models/auh.model";
import {FormParticipantComponent} from "../../../forms/form-participant/form-participant.component";
import {SidebarModule} from "primeng/sidebar";
import {EditParticipantSidebarComponent} from "../edit-participant-sidebar/edit-participant-sidebar.component";

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [
    ParticipantCardComponent,
    ConfirmDialogModule,
    CreateParticipantBtnComponent,
    FormParticipantComponent,
    SidebarModule,
    EditParticipantSidebarComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './participants-list.component.html',
})
export class ParticipantsListComponent implements OnInit {
  private tripService = inject(TripService)
  private http = inject(HttpClient)

  participants: Participant[] | null = null
  participantToEdit: Participant | undefined

  tripOwner: Participant | undefined = undefined

  ngOnInit() {
    this.http.get<{ participants: Participant[], owner: IUser }>(`${apiEndpoint}/trips/${this.tripService.tripSelected()?.id}/participants`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(constants.TOKEN_NAME) ?? ''}`
      }
    })
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

  protected handleEditParticipantFromList(participant: Participant) {
    if(this.participants) {
      this.participantToEdit = undefined

      // Update the participant in list
      const index = this.participants.findIndex(p => p.id === participant.id);
      if (index !== -1) {
        this.participants[index] = participant;
      }

    }
  }
}

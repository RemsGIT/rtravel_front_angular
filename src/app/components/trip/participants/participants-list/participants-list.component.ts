import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Participant} from "../../../../../models/participant.model";
import {apiEndpoint} from "../../../../constants";
import {TripService} from "../../../../services/trip/trip.service";

import {ParticipantCardComponent} from "../participant-card/participant-card.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {CreateParticipantBtnComponent} from "../create-participant-btn/create-participant-btn.component";

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

  ngOnInit() {
    this.http.get<{ participants: Participant[] }>(`${apiEndpoint}/trips/${this.tripService.tripSelected()?.id}/participants`)
      .subscribe(response => {
        this.participants = response.participants
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

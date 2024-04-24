import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndpoint} from "../../constants";
import {IParticipantRequest, Participant} from "../../../models/participant.model";
import {IUser} from "../../../models/auh.model";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) {}

  persistParticipant(data: IParticipantRequest, tripId: number) {

    return this.http.post<Participant>(`${apiEndpoint}/trips/${tripId}/participants`, data)
  }

  deleteParticipant(id: number, tripId: number) {
    return this.http.delete(`${apiEndpoint}/trips/${tripId}/participants/${id}`)
  }

  /**
   * While adding participant with email, search if user exists
   * @param email
   */
  searchUserByEmail(email: string) {
    return this.http.get<IUser>(`${apiEndpoint}/users/search/${email}`)
  }
}

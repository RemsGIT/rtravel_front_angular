import {Injectable, signal} from '@angular/core';
import {Activity, IActivityRequest, ITripRequest, ITripUpdateRequest, Trip} from "../../../models/trip.model";
import {apiEndpoint} from "../../constants";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TripService {
  tripSelected = signal<Trip | undefined | null>(undefined)
  constructor(private http: HttpClient) {}

  getTripById(id: string | number) {
    this.tripSelected.set(undefined)
    return this.http.get<Trip>(`${apiEndpoint}/trips/${id}`);
  }

  persistTrip(data: ITripRequest) {
    return this.http.post<Trip>(`${apiEndpoint}/trips`, data)
  }

  updateTrip(data: ITripUpdateRequest | FormData, tripId: number) {
    return this.http.patch<Trip>(`${apiEndpoint}/trips/${tripId}`, data)
  }

  deleteTrip(tripId: number) {
    return this.http.delete(`${apiEndpoint}/trips/${tripId}`)
  }

  persistActivity(data: IActivityRequest, tripId?: number) {
    const trip = tripId ? tripId : this.tripSelected()?.id

    return this.http.post<Activity>(`${apiEndpoint}/trips/${trip}/activities`, data)
  }

  updateActivity(data: Activity, id: number) {
    return this.http.patch<Activity>(`${apiEndpoint}/trips/${this.tripSelected()?.id}/activities/${id}`, data)
  }

  deleteActivity(id: string | number) {
    return this.http.delete(`${apiEndpoint}/trips/${this.tripSelected()?.id}/activities/${id}`)
  }

  getParticipants() {
    return this.http.get(`${apiEndpoint}/trips/${this.tripSelected()?.id}/participants`)
  }
}

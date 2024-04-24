import {Participant} from "./participant.model";

export interface Trip {
  id: number,
  name: string,
  city: string,
  countryCode: string,
  start: Date,
  end: Date,
  activities?: Activity[],
  participants?: Participant[]
}

export interface Activity {
  id: string | number,
  name: string,
  place: string,
  city: string,
  start: Date,
  icon: string,
}

export interface IActivityRequest {
  name: string,
  start: Date,
  city: string,
  icon: string,
  place: string,
  tripId?: number
}

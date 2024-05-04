import {Participant} from "./participant.model";
import {IUser} from "./auh.model";
import {Payment} from "./budget.model";

export interface Trip {
  id: number,
  name: string,
  city: string,
  countryCode: string,
  start: Date,
  end: Date,
  thumbnail?: string,
  cover?: string,
  activities?: Activity[],
  user?: IUser,
  participants?: Participant[],
  payments?: Payment[],
  isShared?: boolean
}

export interface Activity {
  id: string | number,
  name: string,
  place: string,
  city: string,
  start: Date,
  icon: string,
}

export interface ITripRequest {
  name: string,
  city: string,
  start: Date,
  end: Date,
  countryCode: string,

}

export interface ITripUpdateRequest {
  name?: string,
  city?: string,
  start?: Date | string,
  end?: Date | string,
  countryCode?: string,
  thumbnail?: string,
  cover?: string,
}

export interface IActivityRequest {
  name: string,
  start: Date,
  city: string,
  icon: string,
  place: string,
}

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
  latitude?: number,
  longitude?: number
  isShared?: boolean,
}

export interface Activity {
  id: string | number,
  name: string,
  place: string,
  city: string,
  start: Date,
  icon: string,
  latitude?: number,
  longitude?: number
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
  latitude?: number,
  longitude?: number
}

export interface IActivityRequest {
  name: string,
  start: Date,
  city: string,
  icon: string,
  place: string,
  latitude?: number,
  longitude?: number
}


export const listTypesIcons = [
  {icon: '/assets/images/icons/transport.png', code: 'transport', name: 'Transport' },
  {icon: '/assets/images/icons/visit.png', code: 'visit', name: 'Visite' },
  {icon: '/assets/images/icons/hiking.png', code: 'hiking', name: 'Randonnée' },
  {icon: '/assets/images/icons/sport.png', code: 'sport', name: 'Sport' },
  {icon: '/assets/images/icons/restaurant.png', code: 'restaurant', name: 'Restaurant' },
  {icon: '/assets/images/icons/sea.png', code: 'sea', name: 'Plage' },
  {icon: '/assets/images/icons/keys.png', code: 'accommodation', name: 'Logement' },
  {icon: '/assets/images/icons/redflag.png', code: 'other', name: 'Autre' },
]

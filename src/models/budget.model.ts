import {IUser} from "./auh.model";
import {Participant} from "./participant.model";

export interface Budget {
  id: number,
  amount: number,
  tripId: number,
  createdAt: Date
}

export interface Payment {
  id: number,
  amount: number,
  description?: string,
  category: EPaymentCategory,
  participantId?: number,
  userId?: number,
  createdById: number
  updatedById?: number,
  createdAt: Date,
  updatedAt: Date,

  user?: IUser;
  participant?: Participant
}


export enum EPaymentCategory {
  transport = 'transport',
  accommodation = 'accommodation',
  food = 'food',
  activities = 'activities',
  shopping = 'shopping',
  services = 'service',
  other = 'other'
}

// REQUESTS

export interface BudgetRequest {
  amount: number
}

export interface PaymentRequest {
  amount: number,
  description: string,
  category: EPaymentCategory,
  participantId: number,
}

export interface Budget {
  id: number,
  amount: number,
  tripId: number,
  createdAt: Date
}

export interface Payment {
  id: number,
  amount: number,
  category: EPaymentCategory,
  participantId: number,
  createdById: number
  updatedById?: number,
  createdAt: Date,
  updatedAt: Date,
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
  category: EPaymentCategory,
  participantId: number,
}
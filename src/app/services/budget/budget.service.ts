import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Budget, BudgetRequest, Payment, PaymentRequest} from "../../../models/budget.model";
import {Participant} from "../../../models/participant.model";
import {apiEndpoint} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) {}

  // **** BUDGET ****
  getBudgetByTrip(tripId: number) {
    return this.http.get<Budget>(`${apiEndpoint}/trips/${tripId}/budget`)
  }

  persistBudget(data: BudgetRequest, tripId: number) {
    return this.http.post<Budget>(`${apiEndpoint}/trips/${tripId}/budget`, data)
  }

  updateBudget(data: BudgetRequest, budgetId: number, tripId: number) {
    return this.http.patch<Budget>(`${apiEndpoint}/trips/${tripId}/budget/${budgetId}`, data)
  }

  removeBudget(budgetId: number, tripId: number) {
    return this.http.delete<any>(`${apiEndpoint}/trips/${tripId}/budget/${budgetId}`)
  }

  // **** PAYMENTS ****
  getAllPaymentsByTrip(tripId: number) {
    return this.http.get<Payment[]>(`${apiEndpoint}/trips/${tripId}/payments`)
  }

  persistPayment(data: PaymentRequest, tripId: number) {
    return this.http.post<Payment>(`${apiEndpoint}/trips/${tripId}/payments`, data)
  }

  updatePayment(data: PaymentRequest, tripId: number) {
    return this.http.patch<Payment>(`${apiEndpoint}/trips/${tripId}/payments`, data)
  }

  removePayment(paymentId: number, tripId: number) {
    return this.http.delete<any>(`${apiEndpoint}/trips/${tripId}/payments/${paymentId}`)
  }
}

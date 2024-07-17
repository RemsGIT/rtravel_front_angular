import {Component, OnInit} from '@angular/core';
import {BudgetCircleRecapChartComponent} from "../budget-circle-recap-chart/budget-circle-recap-chart.component";
import {NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {LucideAngularModule} from "lucide-angular";
import {CardModule} from "primeng/card";
import {FormBudgetComponent} from "../form-budget/form-budget.component";
import {Budget, Payment} from "../../../../../models/budget.model";
import {BudgetService} from "../../../../services/budget/budget.service";
import {TripService} from "../../../../services/trip/trip.service";
import {CreateBudgetPaymentBtnComponent} from "../create-budget-payment-btn/create-budget-payment-btn.component";
import {BudgetWidgetLastPaymentsComponent} from "../budget-widget-last-payments/budget-widget-last-payments.component";
import {FormPaymentComponent} from "../form-payment/form-payment.component";

@Component({
  selector: 'app-budget-trip',
  standalone: true,
    imports: [
        BudgetCircleRecapChartComponent,
        NgOptimizedImage,
        ButtonModule,
        LucideAngularModule,
        CardModule,
        FormBudgetComponent,
        CreateBudgetPaymentBtnComponent,
        BudgetWidgetLastPaymentsComponent,
        FormPaymentComponent
    ],
  templateUrl: './budget-trip.component.html',
})
export class BudgetTripComponent implements OnInit{

  openFormBudget = false
  openFormPayment = false
  isLoaded = false;

  budget: Budget | undefined
  payments: Payment[] = []

  constructor(private budgetService: BudgetService, private tripService: TripService) {}

  ngOnInit(): void {
    this.payments = this.tripService.tripSelected()?.payments ?? []
    this.budget = this.tripService.tripSelected()?.budget

    this.isLoaded = true
  }

  getTotalPaymentsAmount() {
    return Number(this.payments.reduce((acc, item) => acc + item.amount, 0).toFixed(2))
  }

  protected readonly Number = Number;
}

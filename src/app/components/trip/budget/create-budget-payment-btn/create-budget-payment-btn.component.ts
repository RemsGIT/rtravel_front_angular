import {Component, input, output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {LucideAngularModule} from "lucide-angular";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {SidebarModule} from "primeng/sidebar";
import {FormBudgetComponent} from "../form-budget/form-budget.component";
import {Budget, Payment} from "../../../../../models/budget.model";
import {FormPaymentComponent} from "../form-payment/form-payment.component";

@Component({
  selector: 'app-create-budget-payment-btn',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputTextModule,
    LucideAngularModule,
    PaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    SidebarModule,
    FormBudgetComponent,
    FormPaymentComponent
  ],
  templateUrl: './create-budget-payment-btn.component.html',
})
export class CreateBudgetPaymentBtnComponent {
  protected sidebarVisible: boolean = false
  protected openFormBudget = false
  protected openFormPayment = false
  isBudgetExist = input(false)

  onCreateBudget = output<Budget>()
  onCreatePayment = output<Payment>()

  onChangeVisibilityFormBudget (state: boolean) {
    this.openFormBudget = state
    if(!state) this.sidebarVisible = false
  }

  onChangeVisibilityFormPayment (state: boolean) {
    this.openFormPayment = state
    if(!state) this.sidebarVisible = false
  }
}

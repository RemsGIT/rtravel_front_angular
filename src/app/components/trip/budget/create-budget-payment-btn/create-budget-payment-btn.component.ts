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
import {Budget} from "../../../../../models/budget.model";

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
    FormBudgetComponent
  ],
  templateUrl: './create-budget-payment-btn.component.html',
})
export class CreateBudgetPaymentBtnComponent {
  protected sidebarVisible: boolean = false
  protected openFormBudget = false
  isBudgetExist = input(false)

  onCreateBudget = output<Budget>()

  onChangeVisibilityFormBudget (state: boolean) {
    this.openFormBudget = state
    if(!state) this.sidebarVisible = false
  }
}

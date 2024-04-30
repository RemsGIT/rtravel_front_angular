import {Component, input, OnInit, output} from '@angular/core';
import {FormActivityComponent} from "../../../forms/form-activity/form-activity.component";
import {LucideAngularModule} from "lucide-angular";
import {SharedModule} from "primeng/api";
import {SidebarModule} from "primeng/sidebar";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {toast} from "ngx-sonner";
import {InputNumberModule} from "primeng/inputnumber";
import {BudgetService} from "../../../../services/budget/budget.service";
import {TripService} from "../../../../services/trip/trip.service";
import { constants } from '../../../../constants';
import {Budget} from "../../../../../models/budget.model";

@Component({
  selector: 'app-form-budget',
  standalone: true,
  imports: [
    FormActivityComponent,
    LucideAngularModule,
    SharedModule,
    SidebarModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './form-budget.component.html',
})
export class FormBudgetComponent implements OnInit {
  sidebarVisible = input.required<boolean>()
  onChangeVisibility = output<boolean>()
  onCreateBudget = output<Budget>()

  budgetEditingValue =  input<Budget>()
  budgetValue: number | undefined

  constructor(private budgetService: BudgetService, private tripService: TripService) { }

  ngOnInit() {
    if(this.budgetEditingValue()) {
      this.budgetValue = this.budgetEditingValue()?.amount
    }
  }

  onVisibilityChange(state: boolean) {
    this.onChangeVisibility.emit(state)
  }


  onSubmitCreateBudget() {
    if(!this.budgetValue) {
      toast.warning("Saisi la valeur de ton budget")
    }
    else {
      if(this.budgetEditingValue()) {
        this.budgetService.updateBudget({amount: this.budgetValue}, this.budgetEditingValue()?.id as number ,this.tripService.tripSelected()?.id as number)
          .subscribe({
            next: response => {
              this.onCreateBudget.emit(response)
              this.onChangeVisibility.emit(false)
              toast.success("Le budget a été modifié")
            },
            error: e => {
              if(e.status === 400) {
                if(e.error.error === "NOT_AUTHORIZED") {
                  toast.warning(constants.messages.ERROR_NEED_WRITE)
                  return
                }
              }
              toast.error(constants.messages.ERROR_UPDATE)
            }
          })
      }
      else {
        this.budgetService.persistBudget({amount: this.budgetValue}, this.tripService.tripSelected()?.id as number)
          .subscribe({
            next: response => {
              this.onCreateBudget.emit(response)
              this.onChangeVisibility.emit(false)
              toast.success("Le budget a été créé")
            },
            error: e => {
              if(e.status === 400) {
                if(e.error.error === "NOT_AUTHORIZED") {
                  toast.warning(constants.messages.ERROR_NEED_WRITE)
                  return
                }
              }
              toast.error(constants.messages.ERROR_UPDATE)
            }
          })
      }

    }
  }


}

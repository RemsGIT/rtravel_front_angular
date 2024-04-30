import {Component, input, OnInit, output} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {CardModule} from "primeng/card";
import {LucideAngularModule} from "lucide-angular";
import {NgxGaugeModule} from "ngx-gauge";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {FormBudgetComponent} from "../form-budget/form-budget.component";
import {Budget} from "../../../../../models/budget.model";
import {BudgetService} from "../../../../services/budget/budget.service";
import {TripService} from "../../../../services/trip/trip.service";
import {toast} from "ngx-sonner";
import {constants} from "../../../../constants";

@Component({
  selector: 'app-budget-circle-recap-chart',
  standalone: true,
  imports: [
    ChartModule,
    CardModule,
    LucideAngularModule,
    NgxGaugeModule,
    MenuModule,
    FormBudgetComponent
  ],
  templateUrl: './budget-circle-recap-chart.component.html',
})
export class BudgetCircleRecapChartComponent implements OnInit{
  items: MenuItem[] | undefined;
  isEditingBudget = false

  budget = input.required<Budget>()
  totalPaymentsAmount = input.required<number>()

  onUpdateBudget = output<Budget>()
  onRemoveBudget = output()

  constructor(private budgetService: BudgetService, private tripService: TripService) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Modifier',
        icon: 'pencil',
        command: () => {
          this.isEditingBudget = true
        }
      },
      {
        label: 'Supprimer',
        icon: 'trash',
        command: () => {
          this.budgetService.removeBudget(this.budget().id, this.tripService.tripSelected()?.id as number)
            .subscribe({
              next: response => {
                toast.success("Le budget a été supprimé")
                this.onRemoveBudget.emit()
              },
              error: e => {
                if(e.status === 400) {
                  if(e.error.error === "NOT_AUTHORIZED") {
                    toast.warning(constants.messages.ERROR_NEED_WRITE)
                    return
                  }
                }
                toast.error(constants.messages.ERROR_DELETE)
              }
            })
        }
      }
    ];
  }

  onEditBudget(budget: Budget) {
    this.onUpdateBudget.emit(budget)
  }

  protected readonly Number = Number;
}

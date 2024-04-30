import {Component, input, OnInit, output} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {CardModule} from "primeng/card";
import {LucideAngularModule} from "lucide-angular";
import {NgxGaugeModule} from "ngx-gauge";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {FormBudgetComponent} from "../form-budget/form-budget.component";
import {Budget} from "../../../../../models/budget.model";

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

        }
      }
    ];
  }

  onEditBudget(budget: Budget) {
    this.onUpdateBudget.emit(budget)
  }

  protected readonly Number = Number;
}

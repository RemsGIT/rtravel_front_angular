import {Component, input, OnInit} from '@angular/core';
import {Payment} from "../../../../../models/budget.model";
import {CardModule} from "primeng/card";
import {LucideAngularModule} from "lucide-angular";
import {MenuItem, SharedModule} from "primeng/api";
import {DataViewModule} from "primeng/dataview";
import {NgClass} from "@angular/common";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import {MenuModule} from "primeng/menu";
import {Router} from "@angular/router";
import {TripService} from "../../../../services/trip/trip.service";

@Component({
  selector: 'app-budget-widget-last-payments',
  standalone: true,
  imports: [
    CardModule,
    LucideAngularModule,
    SharedModule,
    DataViewModule,
    NgClass,
    MenuModule
  ],
  templateUrl: './budget-widget-last-payments.component.html',
  styleUrl: './budget-widget-last-payments.component.scss'
})
export class BudgetWidgetLastPaymentsComponent implements OnInit{
  items: MenuItem[] = []
  lastPayments = input.required<Payment[]>()

  protected readonly dayjs = dayjs;
  protected readonly fr = fr;

  constructor(private router: Router, private tripService: TripService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Voir les dépenses',
        icon: 'eye',
        command: () => {
          this.router.navigateByUrl(`/voyage/${this.tripService.tripSelected()?.id as number}/depenses`)
        }
      }
    ];
  }
}

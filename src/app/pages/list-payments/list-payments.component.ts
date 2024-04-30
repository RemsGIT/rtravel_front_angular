import {Component, OnInit} from '@angular/core';
import {Payment} from "../../../models/budget.model";
import {BudgetService} from "../../services/budget/budget.service";
import {TripService} from "../../services/trip/trip.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LucideAngularModule} from "lucide-angular";
import fr from "dayjs/locale/fr";
import dayjs from "dayjs";
import {ConfirmationService, MenuItem, SharedModule} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {FormPaymentComponent} from "../../components/trip/budget/form-payment/form-payment.component";
import {DecimalPipe} from "@angular/common";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {toast} from "ngx-sonner";
import {constants} from "../../constants";

@Component({
  selector: 'app-list-payments',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    MenuModule,
    SharedModule,
    ConfirmDialogModule,
    FormPaymentComponent,
    DecimalPipe
  ],
  providers: [ConfirmationService],
  templateUrl: './list-payments.component.html',
})
export class ListPaymentsComponent implements OnInit {
  protected readonly fr = fr;
  protected readonly dayjs = dayjs;

  items: MenuItem[] = []
  payments: Payment[] = []

  isLoaded = false

  paymentToEdit: Payment | undefined

  constructor(private tripService: TripService, private budgetService: BudgetService, private route: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? ''

    this.tripService.getTripById(id)
      .subscribe({
        next: (response) => {
          this.tripService.tripSelected.set(response)
        },
      })


    this.budgetService.getAllPaymentsByTrip(Number(id))
      .subscribe({
        next: response => {
          this.isLoaded = true

          this.payments = response
        }
      })

    this.items = [
      {
        label: 'Modifier',
        icon: 'pencil',
        command: (event) => {
          let id: string
          //@ts-ignore
          if(event.originalEvent?.srcElement.parentElement.getAttribute('payment') !== null) {
            //@ts-ignore
            id = event.originalEvent?.srcElement.parentElement.getAttribute('payment')
          }
          //@ts-ignore
          else if(event.originalEvent?.srcElement.parentElement.parentElement.getAttribute('payment') !== null){
            //@ts-ignore
            id = event.originalEvent?.srcElement.parentElement.parentElement.getAttribute('payment')
          }
          else { //@ts-ignore
            id = event.originalEvent?.srcElement.getAttribute('payment')
          }


          this.paymentToEdit = this.payments.find(p => p.id === Number(id) )

        }
      },
      {
        label: 'Supprimer',
        icon: 'trash',
        command: (event) => {
          let id: string
          //@ts-ignore
          if(event.originalEvent?.srcElement.parentElement.getAttribute('payment') !== null) {
            //@ts-ignore
            id = event.originalEvent?.srcElement.parentElement.getAttribute('payment')
          }
          //@ts-ignore
          else if(event.originalEvent?.srcElement.parentElement.parentElement.getAttribute('payment') !== null){
            //@ts-ignore
            id = event.originalEvent?.srcElement.parentElement.parentElement.getAttribute('payment')
          }
          else { //@ts-ignore
            id = event.originalEvent?.srcElement.getAttribute('payment')
          }


          console.log(id)
          this.confirmationService.confirm({
            key: id,
            header: "Êtes-vous sûr ?",
            message: 'Cette action est irréversible',
            accept: () => {
              this.handleDeletePayment(Number(id))
            }
          })
        }
      },
    ]
  }

  getTotalPaymentsAmount() {
    return this.payments.length ? this.payments.reduce((acc, item) => acc + item.amount, 0) : 0
  }

  groupPaymentsByDate(payments: any[]): { [key: string]: any[] } {
    const groupedPayments: { [key: string]: any[] } = {};

    payments.forEach(payment => {
      const dateKey = dayjs(payment.createdAt).format('YYYY-MM-DD');

      if (!groupedPayments[dateKey]) {
        groupedPayments[dateKey] = [];
      }

      groupedPayments[dateKey].push(payment);
    });

    return groupedPayments;
  }

  getOrganizedPayments(): { date: string, payments: any[] }[] {
    if (!this.payments.length) return []

    const groupedPayments = this.groupPaymentsByDate(this.payments);
    const organizedPayments = [];

    for (const dateKey in groupedPayments) {
      if (groupedPayments.hasOwnProperty(dateKey)) {
        const formattedDate = dayjs(dateKey).locale('fr').format('dddd DD MMMM');


        organizedPayments.push({
          date: (dayjs(dateKey).isSame(dayjs(), 'day') ? 'Aujourd\'hui' : dayjs().diff(dayjs(dateKey), 'day') === 1 ? 'Hier' : formattedDate),
          payments: groupedPayments[dateKey]
        });
      }
    }

    return organizedPayments;
  }

  returnToBudgetPage() {
    this.router.navigateByUrl(`/voyage/${this.route.snapshot.paramMap.get('id')}?tab=3`)
  }

  onChangeVisibility(state: boolean) {
    if(!state) {
      this.paymentToEdit = undefined
    }
  }

  handleUpdatePayment(payment: Payment) {
    // Find the payment
    let paymentToEdit = this.payments.find(p => p.id === payment.id)

    if(paymentToEdit) {
      paymentToEdit = payment
    }

    this.payments = this.payments.map(p => {
      return p.id === paymentToEdit?.id ? paymentToEdit : p
    });
  }

  handleDeletePayment(paymentId: number) {
    this.budgetService.removePayment(paymentId, this.tripService.tripSelected()?.id as number)
      .subscribe({
        next: response => {
          const index = this.payments.findIndex(p => p.id === paymentId)

          if(index !== -1) this.payments.splice(index, 1);

          toast.success("La dépense a été supprimée")
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

import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
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
import {DecimalPipe, NgOptimizedImage} from "@angular/common";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {toast} from "ngx-sonner";
import {constants} from "../../constants";
import {DividerModule} from "primeng/divider";
import {animate, style, transition, trigger} from "@angular/animations";

interface Transaction {
  from: string;
  to: string;
  amount: number;
}

interface TransactionsByPerson {
  name: string;
  transactions: Transaction[];
}

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
    DecimalPipe,
    DividerModule,
    NgOptimizedImage
  ],
  providers: [ConfirmationService],
  templateUrl: './list-payments.component.html',
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('150ms ease-out', style({transform: 'translateX(0)'})),
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('150ms ease-out', style({transform: 'translateX(0)'})),
      ]),
    ])
  ]
})
export class ListPaymentsComponent implements OnInit {
  protected readonly fr = fr;
  protected readonly dayjs = dayjs;

  items: MenuItem[] = []
  payments: Payment[] = []
  displayedPayments: Payment[] = []

  firstLoad = true // use for disable animation at first load
  isLoaded = false
  showRepartition = false

  paymentToEdit: Payment | undefined
  participantsWithTotal: any[] = []

  transactionRepartition: Transaction[] = []

  // Lazy loading
  private paymentsPerPage = 10;
  private currentPage = 1;

  constructor(private tripService: TripService, private budgetService: BudgetService, private route: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? ''

    this.tripService.getTripById(id)
      .subscribe({
        next: (response) => {
          this.tripService.tripSelected.set(response)

          this.isLoaded = true
          this.payments = response.payments ?? []
          this.loadPayments()
          this.participantsWithTotal = this.getTotalByParticipant()
          this.transactionRepartition = this.calculateEqualDistribution()

          this.checkInitialLoad()

          // Handle default tab => with param url
          this.route.queryParams.subscribe(params => {
            if (params['tab']) {
              switch (params['tab']) {
                case 'repartition':
                  this.showRepartition = true;
                  this.firstLoad = false;
                  break; // enable animation
                case 'list':
                  this.showRepartition = false;
              }
            }
          });
        },
      })

    this.items = [
      {
        label: 'Modifier',
        icon: 'pencil',
        command: (event) => {
          let id: string
          //@ts-ignore
          if (event.originalEvent?.srcElement.parentElement.getAttribute('payment') !== null) {
            //@ts-ignore
            id = event.originalEvent?.srcElement.parentElement.getAttribute('payment')
          }
          //@ts-ignore
          else if (event.originalEvent?.srcElement.parentElement.parentElement.getAttribute('payment') !== null) {
            //@ts-ignore
            id = event.originalEvent?.srcElement.parentElement.parentElement.getAttribute('payment')
          } else { //@ts-ignore
            id = event.originalEvent?.srcElement.getAttribute('payment')
          }


          this.paymentToEdit = this.payments.find(p => p.id === Number(id))
        }
      },
      {
        label: 'Supprimer',
        icon: 'trash',
        command: (event) => {
          let id: string
          //@ts-ignore
          if (event.originalEvent?.srcElement.parentElement.getAttribute('payment') !== null) {
            //@ts-ignore
            id = event.originalEvent?.srcElement.parentElement.getAttribute('payment')
          }
          //@ts-ignore
          else if (event.originalEvent?.srcElement.parentElement.parentElement.getAttribute('payment') !== null) {
            //@ts-ignore
            id = event.originalEvent?.srcElement.parentElement.parentElement.getAttribute('payment')
          } else { //@ts-ignore
            id = event.originalEvent?.srcElement.getAttribute('payment')
          }

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
    return this.payments.length ? Number(this.payments.reduce((acc, item) => acc + item.amount, 0).toFixed(2)) : 0
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
    if (!this.displayedPayments.length) return []

    const groupedPayments = this.groupPaymentsByDate(this.displayedPayments);
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
    if (!state) {
      this.paymentToEdit = undefined
    }
  }

  handleUpdatePayment(payment: Payment) {
    // Find the payment
    let paymentToEdit = this.payments.find(p => p.id === payment.id)

    if (paymentToEdit) {
      paymentToEdit = payment
    }

    this.payments = this.payments.map(p => {
      return p.id === paymentToEdit?.id ? paymentToEdit : p
    });

    this.participantsWithTotal = this.getTotalByParticipant()
    this.transactionRepartition = this.calculateEqualDistribution()
  }

  handleDeletePayment(paymentId: number) {
    this.budgetService.removePayment(paymentId, this.tripService.tripSelected()?.id as number)
      .subscribe({
        next: response => {
          const index = this.payments.findIndex(p => p.id === paymentId)

          if (index !== -1) this.payments.splice(index, 1);

          toast.success("La dépense a été supprimée")

          this.participantsWithTotal = this.getTotalByParticipant()
          this.transactionRepartition = this.calculateEqualDistribution()
        },
        error: e => {
          if (e.status === 400) {
            if (e.error.error === "NOT_AUTHORIZED") {
              toast.warning(constants.messages.ERROR_NEED_WRITE)
              return
            }
          }
          toast.error(constants.messages.ERROR_DELETE)
        }
      })
  }

  getTotalByParticipant(): any[] {
    const participantsMap = new Map<number, { id: number; name: string; total: number }>();

    // Add all participants with 0 payment by default
    if (this.tripService.tripSelected()?.user) {
      participantsMap.set(this.tripService.tripSelected()?.user?.id as number, {
        id: this.tripService.tripSelected()?.user?.id as number,
        name: this.tripService.tripSelected()?.user?.username as string,
        total: 0
      })
    }

    this.tripService.tripSelected()?.participants?.forEach(participant => {
      participantsMap.set(participant.id, {
        id: participant.id,
        name: participant.name,
        total: 0
      });
    })

    this.payments.forEach(payment => {
      const participantId = payment.participantId || payment.userId;
      const participantName = payment.participant?.name || payment.user?.username;
      const amount = payment.amount;

      if (participantId && participantName) {
        if (participantsMap.has(participantId)) {
          // Ajouter le montant du paiement au total existant pour ce participant
          const participant = participantsMap.get(participantId)!;
          participant.total += amount;
        } else {
          // Initialiser un nouveau total pour ce participant
          participantsMap.set(participantId, {id: participantId, name: participantName, total: amount});
        }
      }
    });

    // Convertir la Map en tableau et trier par nom du participant
    const totalsArray = Array.from(participantsMap.values()).sort((a, b) => (a.name < b.name ? -1 : 1));

    return totalsArray;
  }

  calculateEqualDistribution(): Transaction[] {
    const participants = JSON.parse(JSON.stringify(this.participantsWithTotal)); // Clone the array of participants

    const sum = participants.reduce((acc: any, participant: any) => acc + participant.total, 0);
    const mean = sum / participants.length;

    participants.sort((a: any, b: any) => a.total - b.total); // Sort participants by total payments

    const transactions: Transaction[] = [];

    for (let i = 0, j = participants.length - 1; i < j;) {
      const sender = participants[i];
      const receiver = participants[j];

      const senderDeficit = mean - sender.total;
      const receiverExcess = receiver.total - mean;

      const debt = Math.min(senderDeficit, receiverExcess);

      if (debt > 0) {
        transactions.push({
          from: receiver.name,
          to: sender.name,
          amount: debt
        });

        // Update participants' totals
        sender.total += debt;
        receiver.total -= debt;

        // Move to the next participants if their balances are settled
        if (sender.total === mean) {
          i++;
        }
        if (receiver.total === mean) {
          j--;
        }
      }
    }

    // Reverse the transactions to ensure correct direction (payer to payee)
    const reversedTransactions = transactions.map(({from, to, amount}) => ({
      from: to,
      to: from,
      amount
    }));

    return reversedTransactions;
  }

  transactionsRepartitionByParticipant() {
    const expensesByPerson: TransactionsByPerson[] = [];

    this.transactionRepartition.forEach(transaction => {

      const existingPerson = expensesByPerson.find(person => person.name === transaction.from);

      if (existingPerson) {
        existingPerson.transactions.push({
          from: transaction.from,
          to: transaction.to,
          amount: transaction.amount
        });
      } else {
        expensesByPerson.push({
          name: transaction.from,
          transactions: [{
            from: transaction.from,
            to: transaction.to,
            amount: transaction.amount
          }]
        });
      }
    });

    return expensesByPerson
  }

  onClickShowRepartition() {
    this.showRepartition = true
    const queryParams = {...this.route.snapshot.queryParams};
    queryParams['tab'] = 'repartition';

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });

    this.firstLoad = false
  }

  onClickShowList() {
    this.showRepartition = false
    const queryParams = {...this.route.snapshot.queryParams};
    queryParams['tab'] = 'list';

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }


  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.displayedPayments.length < this.payments.length) {
      this.loadMorePayments();
    }
  }

  private checkInitialLoad() {

    // If not on mobile -> always load all the data
    const isMobile = window.innerWidth <= 768;

    if(!isMobile) {
      this.displayedPayments = this.payments;
      return
    }

    setTimeout(() => {
      const initialHeight = window.innerHeight - (140 + (document.getElementById('total-amount-participants')?.clientHeight ?? 0)) // Container of the payment list -> size of the header + list participants total amount
      const requiredHeight = this.payments.length * 36; // 36px is the height of a payment line

      if (requiredHeight <= initialHeight) {
        this.displayedPayments = this.payments; // Affichez tous les paiements
      } else {
        this.loadPayments(); // Chargez uniquement la première page de paiements
      }
    })

  }


  private loadPayments() {
    const start = (this.currentPage - 1) * this.paymentsPerPage;
    const end = this.currentPage * this.paymentsPerPage;
    this.displayedPayments = this.payments.slice(start, end);
  }


  private loadMorePayments() {
    if (this.displayedPayments.length < this.payments.length) {
      this.currentPage++;
      const newPayments = this.payments.slice((this.currentPage - 1) * this.paymentsPerPage, this.currentPage * this.paymentsPerPage);
      this.displayedPayments = this.displayedPayments.concat(newPayments);
    }
  }
}

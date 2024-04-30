import {Component, input, OnInit, output} from '@angular/core';
import {EPaymentCategory, Payment} from "../../../../../models/budget.model";
import {BudgetService} from "../../../../services/budget/budget.service";
import {TripService} from "../../../../services/trip/trip.service";
import {toast} from "ngx-sonner";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {state} from "@angular/animations";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {ParticipantService} from "../../../../services/participant/participant.service";
import {Participant, ParticipantPolicy} from "../../../../../models/participant.model";
import {IUser} from "../../../../../models/auh.model";
import {apiEndpoint, constants} from "../../../../constants";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-form-payment',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule
  ],
  templateUrl: './form-payment.component.html',
})
export class FormPaymentComponent implements OnInit{
  sidebarVisible = input.required<boolean>()
  onChangeVisibility = output<boolean>()

  onCreatePayment = output<Payment>()
  paymentEditingValue =  input<Payment>()

  paymentForm!: FormGroup

  paymentCategories = [
    {code: EPaymentCategory.transport, name: 'Transport' },
    {code: EPaymentCategory.activities, name: 'Activité' },
    {code: EPaymentCategory.food, name: 'Nourriture' },
    {code: EPaymentCategory.accommodation, name: 'Logement' },
    {code: EPaymentCategory.shopping, name: 'Magasin' },
    {code: EPaymentCategory.services, name: 'Service' },
    {code: EPaymentCategory.other, name: 'Autre' },
  ]
  participantsOptions: {code: string, name: string}[] = []



  constructor(private fb: FormBuilder, private budgetService: BudgetService, private tripService: TripService, private http: HttpClient) {
    this.paymentForm = this.fb.group({
      amount: new FormControl(undefined, [Validators.required, Validators.min(0.01)]),
      description: new FormControl('', []),
      category: new FormControl('', Validators.required),
      participantId: new FormControl(0, [Validators.required,Validators.min(1)])
    })
  }

  ngOnInit(): void {
    if(this.paymentEditingValue()) {
      this.paymentForm.patchValue({
        amount: this.paymentEditingValue()?.amount,
        description: this.paymentEditingValue()?.description,
        category: this.paymentEditingValue()?.category,
        participantId: this.paymentEditingValue()?.participantId
      })
    }

    this.tripService.getParticipants()
      .subscribe({
        next: (response: any) => {
          // Owner
          this.participantsOptions.push({
            code: response.owner.id,
            name: response.owner.username
          })

          // Participants
          response.participants.forEach((participant: Participant) => {
            this.participantsOptions.push({
              code: participant.id.toString(),
              name: participant.name
            })
          })

        }
      })
  }

  onVisibilityChange(state: boolean) {
    this.onChangeVisibility.emit(state)
  }

  onSubmitCreatePayment() {
    if (this.paymentForm.valid) {
      this.budgetService.persistPayment(this.paymentForm.value, this.tripService.tripSelected()?.id as number)
        .subscribe({
          next: response => {
            this.paymentForm.reset()
            this.onCreatePayment.emit(response)
            this.onChangeVisibility.emit(false)
            toast.success("La dépense a été enregistrée")
          },
          error: e => {
            if(e.status === 400) {
              if(e.error.error === "NOT_AUTHORIZED") {
                toast.warning(constants.messages.ERROR_NEED_WRITE)
                return
              }
            }
            toast.error(constants.messages.ERROR_CREATE)
          }
        })
    } else {
      this.paymentForm.markAllAsTouched()
    }
  }



}

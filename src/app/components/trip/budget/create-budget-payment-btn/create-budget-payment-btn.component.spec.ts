import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBudgetPaymentBtnComponent } from './create-budget-payment-btn.component';

describe('CreateBudgetPaymentBtnComponent', () => {
  let component: CreateBudgetPaymentBtnComponent;
  let fixture: ComponentFixture<CreateBudgetPaymentBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBudgetPaymentBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBudgetPaymentBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

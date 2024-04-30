import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetWidgetLastPaymentsComponent } from './budget-widget-last-payments.component';

describe('BudgetWidgetLastPaymentsComponent', () => {
  let component: BudgetWidgetLastPaymentsComponent;
  let fixture: ComponentFixture<BudgetWidgetLastPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetWidgetLastPaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetWidgetLastPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

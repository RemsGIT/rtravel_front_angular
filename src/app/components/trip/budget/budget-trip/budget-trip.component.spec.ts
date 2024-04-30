import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTripComponent } from './budget-trip.component';

describe('BudgetTripComponent', () => {
  let component: BudgetTripComponent;
  let fixture: ComponentFixture<BudgetTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetTripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

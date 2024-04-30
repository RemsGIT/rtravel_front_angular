import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCircleRecapChartComponent } from './budget-circle-recap-chart.component';

describe('BudgetCircleRecapChatComponent', () => {
  let component: BudgetCircleRecapChartComponent;
  let fixture: ComponentFixture<BudgetCircleRecapChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCircleRecapChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCircleRecapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

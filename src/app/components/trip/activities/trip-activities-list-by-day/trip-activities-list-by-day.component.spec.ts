import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripActivitiesListByDayComponent } from './trip-activities-list-by-day.component';

describe('TripActivitiesListByDayComponent', () => {
  let component: TripActivitiesListByDayComponent;
  let fixture: ComponentFixture<TripActivitiesListByDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripActivitiesListByDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripActivitiesListByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

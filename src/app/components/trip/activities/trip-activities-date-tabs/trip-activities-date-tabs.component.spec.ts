import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripActivitiesDateTabsComponent } from './trip-activities-date-tabs.component';

describe('TripActivitiesDateTabsComponent', () => {
  let component: TripActivitiesDateTabsComponent;
  let fixture: ComponentFixture<TripActivitiesDateTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripActivitiesDateTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripActivitiesDateTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

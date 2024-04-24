import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripUpcomingCardComponent } from './trip-upcoming-card.component';

describe('TripUpcomingCardComponent', () => {
  let component: TripUpcomingCardComponent;
  let fixture: ComponentFixture<TripUpcomingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripUpcomingCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripUpcomingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

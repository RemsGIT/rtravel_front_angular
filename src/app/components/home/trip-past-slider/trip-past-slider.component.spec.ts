import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPastSliderComponent } from './trip-past-slider.component';

describe('TripPastSliderComponent', () => {
  let component: TripPastSliderComponent;
  let fixture: ComponentFixture<TripPastSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripPastSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripPastSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

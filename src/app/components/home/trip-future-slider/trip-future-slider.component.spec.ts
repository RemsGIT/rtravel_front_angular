import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFutureSliderComponent } from './trip-future-slider.component';

describe('TripFutureSliderComponent', () => {
  let component: TripFutureSliderComponent;
  let fixture: ComponentFixture<TripFutureSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripFutureSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripFutureSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

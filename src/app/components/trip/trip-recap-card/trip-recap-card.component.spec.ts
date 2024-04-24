import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripRecapCardComponent } from './trip-recap-card.component';

describe('TripRecapCardComponent', () => {
  let component: TripRecapCardComponent;
  let fixture: ComponentFixture<TripRecapCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripRecapCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripRecapCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

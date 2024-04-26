import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripWidgetTicketsComponent } from './trip-widget-tickets.component';

describe('TripWidgetTicketsComponent', () => {
  let component: TripWidgetTicketsComponent;
  let fixture: ComponentFixture<TripWidgetTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripWidgetTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripWidgetTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

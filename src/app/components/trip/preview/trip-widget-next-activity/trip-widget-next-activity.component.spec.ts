import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripWidgetNextActivityComponent } from './trip-widget-next-activity.component';

describe('TripWidgetNextActivityComponent', () => {
  let component: TripWidgetNextActivityComponent;
  let fixture: ComponentFixture<TripWidgetNextActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripWidgetNextActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripWidgetNextActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

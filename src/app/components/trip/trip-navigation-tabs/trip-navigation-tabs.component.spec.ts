import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripNavigationTabsComponent } from './trip-navigation-tabs.component';

describe('TripNavigationTabsComponent', () => {
  let component: TripNavigationTabsComponent;
  let fixture: ComponentFixture<TripNavigationTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripNavigationTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripNavigationTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTripSettingsComponent } from './update-trip-settings.component';

describe('UpdateTripSettingsComponent', () => {
  let component: UpdateTripSettingsComponent;
  let fixture: ComponentFixture<UpdateTripSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTripSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTripSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

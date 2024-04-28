import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTripInformationsComponent } from './update-trip-informations.component';

describe('UpdateTripInformationsComponent', () => {
  let component: UpdateTripInformationsComponent;
  let fixture: ComponentFixture<UpdateTripInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTripInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTripInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

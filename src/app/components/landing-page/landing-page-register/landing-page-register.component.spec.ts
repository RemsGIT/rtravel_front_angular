import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageRegisterComponent } from './landing-page-register.component';

describe('LandingPageRegisterComponent', () => {
  let component: LandingPageRegisterComponent;
  let fixture: ComponentFixture<LandingPageRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageHeroComponent } from './landing-page-hero.component';

describe('LandingPageHeroComponent', () => {
  let component: LandingPageHeroComponent;
  let fixture: ComponentFixture<LandingPageHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

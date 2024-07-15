import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthButtonsComponent } from './oauth-buttons.component';

describe('OauthButtonsComponent', () => {
  let component: OauthButtonsComponent;
  let fixture: ComponentFixture<OauthButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OauthButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OauthButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

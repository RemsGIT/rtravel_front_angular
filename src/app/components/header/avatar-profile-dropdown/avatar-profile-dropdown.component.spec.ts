import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarProfileDropdownComponent } from './avatar-profile-dropdown.component';

describe('AvatarProfileDropdownComponent', () => {
  let component: AvatarProfileDropdownComponent;
  let fixture: ComponentFixture<AvatarProfileDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarProfileDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvatarProfileDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

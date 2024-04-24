import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDropdownActionsComponent } from './activity-dropdown-actions.component';

describe('ActivityDropdownActionsComponent', () => {
  let component: ActivityDropdownActionsComponent;
  let fixture: ComponentFixture<ActivityDropdownActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDropdownActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityDropdownActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

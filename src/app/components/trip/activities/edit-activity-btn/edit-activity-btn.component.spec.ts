import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivityBtnComponent } from './edit-activity-btn.component';

describe('EditActivityBtnComponent', () => {
  let component: EditActivityBtnComponent;
  let fixture: ComponentFixture<EditActivityBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditActivityBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditActivityBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

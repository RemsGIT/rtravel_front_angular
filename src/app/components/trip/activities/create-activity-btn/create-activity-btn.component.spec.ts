import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityBtnComponent } from './create-activity-btn.component';

describe('CreateActivityBtnComponent', () => {
  let component: CreateActivityBtnComponent;
  let fixture: ComponentFixture<CreateActivityBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateActivityBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateActivityBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

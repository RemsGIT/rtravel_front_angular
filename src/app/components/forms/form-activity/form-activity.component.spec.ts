import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActivityComponent } from './form-activity.component';

describe('FormActivityComponent', () => {
  let component: FormActivityComponent;
  let fixture: ComponentFixture<FormActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParticipantBtnComponent } from './create-participant-btn.component';

describe('CreateParticipantBtnComponent', () => {
  let component: CreateParticipantBtnComponent;
  let fixture: ComponentFixture<CreateParticipantBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateParticipantBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateParticipantBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

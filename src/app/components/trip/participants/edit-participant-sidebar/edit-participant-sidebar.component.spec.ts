import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParticipantSidebarComponent } from './edit-participant-sidebar.component';

describe('EditParticipantBtnComponent', () => {
  let component: EditParticipantSidebarComponent;
  let fixture: ComponentFixture<EditParticipantSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditParticipantSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditParticipantSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

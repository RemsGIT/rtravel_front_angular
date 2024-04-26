import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagTripSharedComponent } from './tag-trip-shared.component';

describe('TagTripSharedComponent', () => {
  let component: TagTripSharedComponent;
  let fixture: ComponentFixture<TagTripSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagTripSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagTripSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

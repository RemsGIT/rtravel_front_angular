import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickPointMapComponent } from './pick-point-map.component';

describe('PickPointMapComponent', () => {
  let component: PickPointMapComponent;
  let fixture: ComponentFixture<PickPointMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickPointMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickPointMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

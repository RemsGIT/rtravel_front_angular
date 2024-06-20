import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloropethMapComponent } from './cloropeth-map.component';

describe('CloropethMapComponent', () => {
  let component: CloropethMapComponent;
  let fixture: ComponentFixture<CloropethMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloropethMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloropethMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

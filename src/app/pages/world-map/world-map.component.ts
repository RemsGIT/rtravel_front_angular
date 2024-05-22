import {AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {CloropethMapComponent} from "../../cloropeth-map/cloropeth-map.component";

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [
    CloropethMapComponent
  ],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.scss'
})
export class WorldMapComponent{
  constructor(@Inject(PLATFORM_ID) protected platformId: Object) { }
}

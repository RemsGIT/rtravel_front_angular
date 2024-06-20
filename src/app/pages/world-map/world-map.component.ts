import {Component} from '@angular/core';
import {CloropethMapComponent} from "../../components/cloropeth-map/cloropeth-map.component";

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
}

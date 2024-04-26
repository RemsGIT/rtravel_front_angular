import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-trip-widget-tickets',
  standalone: true,
  imports: [
    CardModule,
    LucideAngularModule
  ],
  templateUrl: './trip-widget-tickets.component.html',
  styleUrl: './trip-widgets-tickets.scss'
})
export class TripWidgetTicketsComponent {

}

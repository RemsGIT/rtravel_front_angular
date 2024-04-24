import { Component } from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-trip-widget-next-activity',
  standalone: true,
  imports: [
    LucideAngularModule,
    CardModule,
    ButtonModule,
    CalendarModule,
  ],
  templateUrl: './trip-widget-next-activity.component.html',
})
export class TripWidgetNextActivityComponent {

}

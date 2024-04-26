import { Component } from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-tag-trip-shared',
  standalone: true,
  imports: [
    LucideAngularModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './tag-trip-shared.component.html',
})
export class TagTripSharedComponent {

}

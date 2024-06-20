import { Component } from '@angular/core';
import {DividerModule} from "primeng/divider";
import {LucideAngularModule} from "lucide-angular";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import dayjs from "dayjs";

@Component({
  selector: 'app-landing-page-footer',
  standalone: true,
  imports: [
    DividerModule,
    LucideAngularModule,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './landing-page-footer.component.html',
  styleUrl: './landing-page-footer.component.scss'
})
export class LandingPageFooterComponent {

  protected readonly dayjs = dayjs;
}

import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {RouterLink} from "@angular/router";
import {LucideAngularModule} from "lucide-angular";
import dayjs from "dayjs";
import {window} from "rxjs";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ButtonModule,
    NgOptimizedImage,
    DividerModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  protected readonly dayjs = dayjs;
  protected readonly window = window;
  protected readonly document = document;
}

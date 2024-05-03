import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ButtonModule,
    NgOptimizedImage,
    DividerModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}

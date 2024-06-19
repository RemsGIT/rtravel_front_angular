import { Component } from '@angular/core';
import {NgxTypedWriterModule} from "ngx-typed-writer";
import {Button} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-landing-page-hero',
  standalone: true,
  imports: [
    NgxTypedWriterModule,
    Button,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './landing-page-hero.component.html',
  styleUrl: './landing-page-hero.component.scss'
})
export class LandingPageHeroComponent {

}

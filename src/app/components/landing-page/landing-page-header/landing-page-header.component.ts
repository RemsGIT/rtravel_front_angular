import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {LucideAngularModule} from "lucide-angular";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SidebarModule} from "primeng/sidebar";

@Component({
  selector: 'app-landing-page-header',
  standalone: true,
  imports: [
    Button,
    LucideAngularModule,
    NgOptimizedImage,
    RouterLink,
    SidebarModule
  ],
  templateUrl: './landing-page-header.component.html',
  styleUrl: './landing-page-header.component.scss'
})
export class LandingPageHeaderComponent {
  sidebarVisible: boolean = false;

  async onClickFeatures() {
    this.sidebarVisible = false
    window.location.href = 'https://rtravel.fr/#features'
  }

  async onClickContact() {
    this.sidebarVisible = false
    window.location.href = 'https://rtravel.fr/#contact'
  }
}

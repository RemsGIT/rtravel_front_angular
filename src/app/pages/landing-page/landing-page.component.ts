import {Component, inject} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {Router, RouterLink} from "@angular/router";
import {LucideAngularModule} from "lucide-angular";
import dayjs from "dayjs";
import {LandingPageHeroComponent} from "../../components/landing-page/landing-page-hero/landing-page-hero.component";
import {
  LandingPageFeaturesComponent
} from "../../components/landing-page/landing-page-features/landing-page-features.component";
import {
  LandingPageRegisterComponent
} from "../../components/landing-page/landing-page-register/landing-page-register.component";
import {SidebarModule} from "primeng/sidebar";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ButtonModule,
    NgOptimizedImage,
    DividerModule,
    RouterLink,
    LucideAngularModule,
    LandingPageHeroComponent,
    LandingPageFeaturesComponent,
    LandingPageRegisterComponent,
    SidebarModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  router = inject(Router)

  protected readonly dayjs = dayjs;

  sidebarVisible: boolean = false;

  async onClickFeatures() {
    this.sidebarVisible = false
    window.location.href = 'http://localhost:4200/#features'
  }

}

import {Component} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {RouterLink} from "@angular/router";
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
import {
  LandingPageContactComponent
} from "../../components/landing-page/landing-page-contact/landing-page-contact.component";
import {
  LandingPageHeaderComponent
} from "../../components/landing-page/landing-page-header/landing-page-header.component";
import {
  LandingPageFooterComponent
} from "../../components/landing-page/landing-page-footer/landing-page-footer.component";

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
    SidebarModule,
    LandingPageContactComponent,
    LandingPageHeaderComponent,
    LandingPageFooterComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  protected readonly dayjs = dayjs;

}

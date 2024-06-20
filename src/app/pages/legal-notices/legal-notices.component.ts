import { Component } from '@angular/core';
import {
  LandingPageHeaderComponent
} from "../../components/landing-page/landing-page-header/landing-page-header.component";
import {
  LandingPageFooterComponent
} from "../../components/landing-page/landing-page-footer/landing-page-footer.component";

@Component({
  selector: 'app-legal-notices',
  standalone: true,
  imports: [
    LandingPageHeaderComponent,
    LandingPageFooterComponent
  ],
  templateUrl: './legal-notices.component.html',
  styleUrl: './legal-notices.component.scss'
})
export class LegalNoticesComponent {

}

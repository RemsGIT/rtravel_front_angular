import { Component } from '@angular/core';
import {
  LandingPageFooterComponent
} from "../../components/landing-page/landing-page-footer/landing-page-footer.component";
import {
  LandingPageHeaderComponent
} from "../../components/landing-page/landing-page-header/landing-page-header.component";

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [
    LandingPageFooterComponent,
    LandingPageHeaderComponent
  ],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent {

}

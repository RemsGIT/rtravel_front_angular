import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-landing-page-register',
  standalone: true,
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './landing-page-register.component.html',
  styleUrl: './landing-page-register.component.scss'
})
export class LandingPageRegisterComponent {

}

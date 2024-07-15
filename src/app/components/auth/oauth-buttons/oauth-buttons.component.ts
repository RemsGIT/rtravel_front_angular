import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {apiEndpoint, constants} from "../../../constants";

@Component({
  selector: 'app-oauth-buttons',
  standalone: true,
  imports: [
    Button,
    NgOptimizedImage
  ],
  templateUrl: './oauth-buttons.component.html',
  styleUrl: './oauth-buttons.component.scss'
})
export class OauthButtonsComponent {

  protected readonly constants = constants;
  protected readonly apiEndpoint = apiEndpoint;
}

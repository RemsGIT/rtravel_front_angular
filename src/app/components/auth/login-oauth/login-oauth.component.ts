import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-login-oauth',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './login-oauth.component.html',
})
export class LoginOauthComponent {

}

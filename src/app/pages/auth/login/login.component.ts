import {Component} from '@angular/core';
import {LoginOauthComponent} from "../../../components/auth/login-oauth/login-oauth.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {toast} from "ngx-sonner";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoginOauthComponent,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.onLoginWithCredentials(this.loginForm.value).subscribe({
        next: (res) => {
          if(!res.verified) {
            toast.error("Ton compte n'est pas encore vérifié")
            this.router.navigateByUrl('/verification-mail')
          }
          else if(res.user) {
            this.router.navigateByUrl('/accueil')
          }
        },
        error: (err) => {
          console.log(err)
          switch(err.status) {
            case 400:
              toast.error("Vos identifiants sont incorrects")
              break;
          }
        },
      })
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}

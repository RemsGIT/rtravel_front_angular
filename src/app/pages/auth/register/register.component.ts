import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {toast} from "ngx-sonner";
import {constants} from "../../../constants";
import {OauthButtonsComponent} from "../../../components/auth/oauth-buttons/oauth-buttons.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterLink,
    CheckboxModule,
    OauthButtonsComponent
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      accept_conditions: new FormControl(false, [Validators.requiredTrue])
    })
  }

  onSubmit() {
    if(this.registerForm.valid) {
      this.authService.onRegister(this.registerForm.value).subscribe({
        next: (res) => {
          if(res.email) {
            // Connect automatically the user
            this.authService.onLoginWithCredentials({email: res.email, password: this.registerForm.value.password})
              .subscribe({
                next: res => {
                  this.authService.onCreateOTPCode().subscribe({
                    next: res => {}
                  })
                }
              })

            this.router.navigateByUrl('/verification-mail')
          }
        },
        error: (err) => {
          let errorMessage = "Erreur lors de la création de votre compte. Réessayez plus tard"
          switch(err.status) {
            case 400:
              if(err.error.errors.some((error: any) => error.field === 'email' && error.rule === 'database.unique')) {
                errorMessage = "L'adresse email est déjà utilisée"
              }
              break;
          }
          toast.error(errorMessage)
        },
      })
    }
    else {
      this.registerForm.markAllAsTouched()
    }
  }
}

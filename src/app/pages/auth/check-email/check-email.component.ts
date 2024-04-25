import {Component, inject} from '@angular/core';
import {InputOtpChangeEvent, InputOtpModule} from "primeng/inputotp";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {LoginOauthComponent} from "../../../components/auth/login-oauth/login-oauth.component";
import {PasswordModule} from "primeng/password";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../services/auth/auth.service";
import {constants} from "../../../constants";
import {toast} from "ngx-sonner";
import confetti from 'canvas-confetti';
import {InputNumberModule} from "primeng/inputnumber";

@Component({
  selector: 'app-check-email',
  standalone: true,
  imports: [
    InputOtpModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    LoginOauthComponent,
    PasswordModule,
    ReactiveFormsModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './check-email.component.html',
})
export class CheckEmailComponent {
  authService = inject(AuthService)

  isSubmitting: boolean = false
  value: number | undefined

  isVerified: boolean = false;

  onChangeOTP(event: InputOtpChangeEvent){
    if(event.value.length === 4) {
      this.isSubmitting = true
      this.authService.onCheckOTPCode({otp: event.value})
        .subscribe({
          next: (response) => {
            confetti({
              particleCount: 100,
              spread: 160,
              origin: { y: 0.6 },
            });
            this.isSubmitting = false
            this.isVerified = true
            this.resetOtpFields()
          },
          error: err => {
            let errorMessage = constants.messages.ERROR_GENERIC
            let type: 'error' | 'warning' = 'error'
            switch (err.status) {
              case 400:
                switch(err.error.error) {
                  case 'OTP_NOT_VALID': errorMessage = "Le code n'est pas valide. Vérifier votre saisie"; break;
                  case 'ACCOUNT_ALREADY_VERIFIED': errorMessage = "Ton compte est déjà vérifié"; type = "warning"; break;
                  case 'OTP_EXPIRED': {
                    errorMessage = "Le code a expiré, un nouveau code a été envoyé";
                    type = 'warning';

                    // send new code
                    this.authService.onCreateOTPCode().subscribe()
                    break;
                  }
                }
                break;
            }
            switch(type) {
              case 'error': toast.error(errorMessage); break;
              case 'warning': toast.warning(errorMessage); break;
            }
            this.isSubmitting = false
            this.value = undefined
            this.resetOtpFields()
          },
        })

    }
  }

  resetOtpFields() {
    document.querySelectorAll('.p-inputtext').forEach((e) => {
      (e as HTMLInputElement).value = ''
    })
  }

  onResendCode(event: MouseEvent) {

    const button: HTMLButtonElement = event.currentTarget as HTMLButtonElement
    button.disabled = true


    this.authService.onCreateOTPCode().subscribe({
      next: res => {
        toast.success('Un nouveau code a été envoyé sur ton adresse email')
      },
      error: err => {
        toast.error(constants.messages.ERROR_GENERIC)
      }
    })

    setTimeout(() => {
      button.disabled = false;
    }, 10000);
  }

  test(event: any) {
    console.log(event)
    return true
  }
}

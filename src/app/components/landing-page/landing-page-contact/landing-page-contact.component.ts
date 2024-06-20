import {Component, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Button} from "primeng/button";
import {HttpClient} from "@angular/common/http";
import {apiEndpoint} from "../../../constants";
import {toast} from "ngx-sonner";

@Component({
  selector: 'app-landing-page-contact',
  standalone: true,
  imports: [
    PaginatorModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    Button
  ],
  templateUrl: './landing-page-contact.component.html',
  styleUrl: './landing-page-contact.component.scss'
})
export class LandingPageContactComponent {
  contactForm!: FormGroup

  isSubmitting = signal(false)

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      body: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }

  onSubmitContact () {
    this.isSubmitting.set(true)
    if(this.contactForm.valid) {
      this.http.post(`${apiEndpoint}/contact`, this.contactForm.getRawValue())
        .subscribe({
          next: res => {
            toast.success('Votre message a bien été envoyé')

            this.isSubmitting.set(false)
          },
          error: err => {
            toast.error("Erreur lors de l'envoie du mail. Veuillez réessayer plus tard")

            this.isSubmitting.set(false)
          }
        })
    }
    else {
      this.contactForm.markAllAsTouched()
    }
  }
}

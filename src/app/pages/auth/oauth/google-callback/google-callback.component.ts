import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../../../services/token/token.service";
import {IUser} from "../../../../../models/auh.model";
import {apiEndpoint} from "../../../../constants";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth/auth.service";
import {toast} from "ngx-sonner";

@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [],
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.scss'
})
export class GoogleCallbackComponent implements OnInit {
  route = inject(ActivatedRoute)
  router = inject(Router)
  authService = inject(AuthService)
  tokenService = inject(TokenService)
  http = inject(HttpClient)

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token') ?? ''

    if(!token) {
      this.router.navigateByUrl('/connexion')
      return
    }
    this.tokenService.setToken(token)

    this.http.get<IUser>(`${apiEndpoint}/auth/me`)
      .subscribe({
        next: (response) => {
          this.authService.currentUserSig.set(response)

          this.router.navigateByUrl('/accueil')
        },
        error: err => {
          const error = this.route.snapshot.queryParamMap.get('error')

          if(error === "already_registered") {
            toast.error('Un compte existe déjà avec cette adresse mail')
          }

          this.router.navigateByUrl('/inscription')
        }
      })

  }



}

import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../services/token/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  const router = inject(Router)

  if(typeof localStorage === 'undefined') return true;

  if(!!tokenService.getToken()) {
    return true
  }
  else {
    router.navigateByUrl('/connexion')
    return false
  }
};

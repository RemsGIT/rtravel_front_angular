import { HttpInterceptorFn } from '@angular/common/http';
import {constants} from "../constants";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = typeof localStorage !== 'undefined' ? localStorage.getItem(constants.TOKEN_NAME) ?? '' : '';

  req = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  })

  return next(req);
};

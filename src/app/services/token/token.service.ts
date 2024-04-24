import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {constants} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  updateToken(status: boolean) {
    this.isAuthentication.next(true)
  }

  setToken(token: string) {
    this.updateToken(true);
    localStorage.setItem(constants.TOKEN_NAME, token)
  }

  getToken(): string | null {
    return localStorage.getItem(constants.TOKEN_NAME) || null;
  }
}

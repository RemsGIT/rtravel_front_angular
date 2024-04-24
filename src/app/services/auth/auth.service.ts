import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser, IUserRegisterRequest, IUserRequest} from "../../../models/auh.model";
import {apiEndpoint} from "../../constants";
import {map} from "rxjs";
import {TokenService} from "../token/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSig = signal<IUser | undefined | null>(undefined)

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  onRegister(data: IUserRegisterRequest) {
    return this.http
      .post(`${apiEndpoint}/auth/register`, data)
      .pipe(map((res : any) => {
        return res
      }))
  }

  onLoginWithCredentials(data: IUserRequest) {
    return this.http
      .post(`${apiEndpoint}/auth/login`, data)
      .pipe(map((res: any) => {
        if(res.token) {
          this.tokenService.setToken(res.token.token)
          this.currentUserSig.set(res.user)
        }
        return res
      }))
  }

  onCreateOTPCode() {
    return this.http
      .post(`${apiEndpoint}/auth/generate-otp`, {})
      .pipe(map((res: any) => {
        console.log(res)
        return res
      }))
  }

  onCheckOTPCode(data: {otp: number}) {
    return this.http
      .post(`${apiEndpoint}/auth/check-otp`, data)
      .pipe(map((res: any) => {return res}))
  }

  logout() {
    return this.http
      .post(`${apiEndpoint}/auth/logout`, {})
      .pipe(map((res: any) => {
        this.tokenService.setToken('')
        this.currentUserSig.set(null)
      }))

  }
}

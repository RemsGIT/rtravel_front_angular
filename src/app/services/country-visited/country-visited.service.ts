import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Participant} from "../../../models/participant.model";
import {apiEndpoint} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class CountryVisitedService {

  constructor(private http: HttpClient) {}

  getCountriesVisited() {
    return this.http.get<string[]>(`${apiEndpoint}/countries`)
  }

  persistCountryVisited(code: string) {
    return this.http.post<{countryCode: string}>(`${apiEndpoint}/countries`, {
      country_code: code
    })
  }

  deleteCountryVisited(code: string) {
    return this.http.delete<any>(`${apiEndpoint}/countries/${code}`)
  }
}

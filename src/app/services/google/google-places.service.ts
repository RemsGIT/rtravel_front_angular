import { Injectable } from '@angular/core';
import {GooglePlaceOption, GooglePlacesPrediction} from "../../../models/google.model";
import { Client } from '@googlemaps/google-maps-services-js';


@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {

  //@ts-ignore
  private autocompleteService: google.maps.places.AutocompleteService;
  //@ts-ignore
  private sessionToken: google.maps.places.AutocompleteSessionToken

  constructor() {
    console.log('init google places service and create token')
    //@ts-ignore
    this.autocompleteService = new google.maps.places.AutocompleteService()
    //@ts-ignore
    this.sessionToken = new google.maps.places.AutocompleteSessionToken()
  }

  searchCountriesAndCitiesByTextAndCountry(query: string): Promise<GooglePlacesPrediction[]> {
    return new Promise((resolve, reject) => {

      this.autocompleteService.getPlacePredictions({
        input: query,
        sessionToken: this.sessionToken,
        //@ts-ignore
      }, (predictions: google.maps.places.AutocompletePrediction[] | null ,status: google.maps.places.PlacesServiceStatus ) => {
        console.log(predictions)
      })
    })
  }

  /**
   * Search cities by text and returns format : city, country
   * @param query
   */
  searchCitiesByText(query: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions({
        input: query,
        sessionToken: this.sessionToken,
        types: ['locality','administrative_area_level_3'],
        //@ts-ignore
      }, (predictions: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
        //@ts-ignore
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if(predictions) {
            resolve(predictions.map(prediction => `${prediction.terms[0].value}, ${prediction.terms[prediction.terms.length-1].value}`));
          }
          else resolve([])
        } else {
          console.log(status)
          resolve([]);
        }
      });
    });
  }

  /**
   * Search cities by text and country and returns format : city
   * @param country
   * @param query
   */
  searchCitiesByCountryAndText(country: string, query: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions({
        input: query,
        sessionToken: this.sessionToken,
        types: ['locality','administrative_area_level_3'],
        componentRestrictions: {country: country},

        //@ts-ignore
      }, (predictions: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
        //@ts-ignore
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if(predictions) {
            resolve(predictions.map(prediction => prediction.terms[0].value));
          }
          else resolve([])
        } else {
          console.log(status)
          resolve([]);
        }
      });
    });
  }
}

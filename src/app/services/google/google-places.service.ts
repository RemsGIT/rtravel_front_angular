import {Injectable} from '@angular/core';


export interface PlaceResult {
  value: string;
  countryCode?: string;
  type?: 'country' | 'city' | 'island';
  latitude?: number,
  longitude?: number
}

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

  searchCountriesAndCitiesByText(query: string): Promise<PlaceResult[]> {
    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions({
        input: query,
        sessionToken: this.sessionToken,
        types: ['country', 'locality', 'administrative_area_level_3', 'natural_feature']
        //@ts-ignore
      }, (predictions: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
        //@ts-ignore
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          //@ts-ignore
          if (predictions) {
            const placesPromises = predictions.map(prediction => {
              return new Promise<PlaceResult>((resolvePlace, rejectPlace) => {
                //@ts-ignore
                const placeService = new google.maps.places.PlacesService(document.createElement('div'));
                placeService.getDetails({
                  placeId: prediction.place_id
                  //@ts-ignore
                }, (place: google.maps.places.PlaceResult | null, placeStatus: google.maps.places.PlacesServiceStatus) => {
                  //@ts-ignore
                  if (placeStatus === google.maps.places.PlacesServiceStatus.OK && place) {
                    let type: 'country' | 'city' | 'island' = 'city';

                    // Check if country
                    if (prediction.types && prediction.types.includes('country')) {
                      type = 'country';
                    } else if (prediction.types.includes('natural_feature')) { // Check if island
                      type = 'island'
                    }
                    let countryCode = '';

                    // Get the country code
                    if (place.address_components) {
                      const countryComponent = place.address_components.find((component: any) =>
                        component.types.includes('country')
                      );
                      if (countryComponent) {
                        countryCode = countryComponent.short_name;
                      }
                    }

                    resolvePlace({
                      value: `${prediction.terms[0].value}${prediction.terms.length > 1 ? ', ' + prediction.terms[prediction.terms.length - 1].value : ''}`,
                      countryCode,
                      type,
                      latitude: place.geometry.location.lat(),
                      longitude: place.geometry.location.lng()
                    });
                  } else {
                    resolvePlace({
                      value: `${prediction.terms[0].value}${prediction.terms.length > 1 ? ', ' + prediction.terms[prediction.terms.length - 1].value : ''}`,
                      countryCode: '',
                      type: 'city'
                    });
                  }
                });
              });
            });

            // Attendre que toutes les promises soient résolues
            Promise.all(placesPromises).then(results => {
              resolve(results);
            });
          } else {
            resolve([]);
          }
        } else {
          resolve([]);
        }
      });
    });
  }


  /**
   * Search cities by text and returns format : city, country
   * @param query
   */
  searchCitiesByText(query: string): Promise<PlaceResult[]> {
    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions({
        input: query,
        sessionToken: this.sessionToken,
        types: ['locality', 'administrative_area_level_3'],
        //@ts-ignore
      }, (predictions: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
        //@ts-ignore
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (predictions) {
            resolve(predictions.map(prediction => ({
              value: `${prediction.terms[0].value}, ${prediction.terms[prediction.terms.length - 1].value}`,
            })));
          } else resolve([])
        } else {
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
  searchCitiesByCountryAndText(country: string, query: string): Promise<PlaceResult[]> {
    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions({
        input: query,
        sessionToken: this.sessionToken,
        types: ['locality', 'administrative_area_level_3'],
        componentRestrictions: {country: country},

        //@ts-ignore
      }, (predictions: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
        //@ts-ignore
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (predictions) {
            resolve(predictions.map(prediction => ({
              value: `${prediction.terms[0].value}, ${prediction.terms[prediction.terms.length - 1].value}`,
            })));
          } else resolve([])
        } else {
          console.log(status)
          resolve([]);
        }
      });
    });
  }
}

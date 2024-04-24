export interface GooglePlacesPrediction {
  result: GooglePlaceOption,
  place_type: IPlaceType
}

export interface GooglePlaceOption {
  name: string,
  code: string
}


export enum IPlaceType {
  COUNTRY = 'country',
  CITY = 'city'
}

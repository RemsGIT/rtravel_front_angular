import {afterNextRender, Component, Inject, input, OnInit, output, PLATFORM_ID} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {animate, style, transition, trigger} from "@angular/animations";
import {TripService} from "../../services/trip/trip.service";
import {ButtonModule} from "primeng/button";

import * as mapboxgl from 'mapbox-gl'
import {Activity} from "../../../models/trip.model";


@Component({
  selector: 'app-pick-point-map',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonModule
  ],
  templateUrl: './pick-point-map.component.html',
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('150ms ease-out', style({transform: 'translateX(0)'})),
      ]),
      transition(":leave", [
        animate('150ms ease-out', style({transform: 'translateX(100%)'})),
      ])
    ])
  ],
})
export class PickPointMapComponent implements OnInit {
  map : mapboxgl.Map | undefined
  centerMarker: mapboxgl.Marker | undefined;

  isSidebarVisible = input.required<boolean>()
  changeVisibility = output<boolean>()
  onSetLocation = output<[number | undefined, number | undefined]>()

  defaultLatitude = input<number>()
  defaultLongitude = input<number>()


  constructor(private tripService: TripService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.initMap()
    })
  }

  initMap() {
    let latitude = this.tripService.tripSelected()?.latitude
    let longitude = this.tripService.tripSelected()?.longitude

    // Check if activity has coordinates in form
    if(this.defaultLatitude() && this.defaultLongitude()) {
      latitude = this.defaultLatitude()
      longitude = this.defaultLongitude()
    }

    this.map = new mapboxgl.Map({
      attributionControl: false,
      container: 'map',
      center: [2.2990098595619206, 49.89863424051644],
      zoom: 2,
      maxZoom: 18,
      accessToken: 'pk.eyJ1IjoicmVteWNhcyIsImEiOiJjbGxzY3Y3c3YweDB2M2VwcHhzOTh2aGE2In0.g4kYgrf9FzOCjuEmHW8-Qg',
      //style: 'mapbox://styles/mapbox/streets-v12',
      //pitchWithRotate: false,
    })

    // If trip has coordinates (center on city/country...)
    if(latitude && longitude) {
      this.map.setCenter([longitude, latitude]).setZoom(15)
    }


    this.centerMarker = new mapboxgl.Marker(this.getCenterMarkerIcon())
      .setLngLat(this.map.getCenter())
      .addTo(this.map)

    this.map.on('move', () => {
      this.centerMarker?.setLngLat((this.map as mapboxgl.Map).getCenter());
    });
  }

  getCenterMarkerIcon() {
    const el = document.createElement('div')
    el.innerHTML = `
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
      </svg>
    `

    return el
  }
}

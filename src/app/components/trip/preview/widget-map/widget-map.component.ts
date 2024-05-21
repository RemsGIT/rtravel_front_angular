import {
  afterNextRender,
  afterRender,
  AfterRenderPhase,
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {CardModule} from "primeng/card";
import {LucideAngularModule} from "lucide-angular";
import {SharedModule} from "primeng/api";
import {TripService} from "../../../../services/trip/trip.service";
import {isPlatformBrowser} from "@angular/common";
import * as L from 'leaflet'

import {listTypesIcons} from "../../../../../models/trip.model";
import 'leaflet.fullscreen/Control.FullScreen.js'
import fr from "dayjs/locale/fr";
import dayjs from "dayjs";


@Component({
  selector: 'app-widget-map',
  standalone: true,
  imports: [
    CardModule,
    LucideAngularModule,
    SharedModule,
  ],
  templateUrl: './widget-map.component.html',
  styleUrl: './widget-map.component.scss',

})
export class WidgetMapComponent implements AfterViewInit {

  map : L.Map | undefined

  constructor(private tripService: TripService) {}

  ngAfterViewInit() {
    this.initMap()
  }


  initMap() {

    const latitude = this.tripService.tripSelected()?.latitude
    const longitude = this.tripService.tripSelected()?.longitude

    this.map = new L.Map('map-widget', {
      zoomControl: false,
      attributionControl: false,
      //@ts-ignore
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topleft'
      }
    }).setView([49.89863424051644, 2.2990098595619206], 2) as L.Map

    if(latitude && longitude) {
      this.map.setView(L.latLng(latitude, longitude), 9)
    }

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVteWNhcyIsImEiOiJjbGxzY3Y3c3YweDB2M2VwcHhzOTh2aGE2In0.g4kYgrf9FzOCjuEmHW8-Qg', {
      maxZoom: 19,
      id: 'mapbox/streets-v12',
      zoomOffset: -1,
      tileSize: 512,
      detectRetina: true,
    }).addTo(this.map);

    this.showActivitiesMarker()
  }

  showActivitiesMarker() {
    this.tripService.tripSelected()?.activities?.forEach(activity => {
      if(this.map && (activity.latitude && activity.longitude)) {
        const marker = L.marker(L.latLng(activity.latitude, activity.longitude), {
          icon: L.divIcon({
            className: '',
            html: `<div class="w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center"><img src="${this.getIconByType(activity.icon)}" class="w-[25px] h-[25px]" alt="" /></div>`})
        }).addTo(this.map);

        // Pop up
        marker.bindPopup(`
            <div class="flex items-center gap-2">
                <img src="${this.getIconByType(activity.icon)}" class="w-[25px] h-[25px]" alt="" />
                  <h4 class="text-[1.15rem]">${activity.name}</h4>
            </div>
            <p class="first-letter:uppercase">
              <span>${dayjs(activity.start).locale(fr).format('dddd DD MMMM à HH:mm:ss')}</span>
            </p>
        `)

      }
    })
  }

  getIconByType(icon: string) {
    const selectedType = listTypesIcons.find(lt => lt.code === icon)

    if(selectedType) {
      return selectedType.icon
    }

    return "plane"
  }
}

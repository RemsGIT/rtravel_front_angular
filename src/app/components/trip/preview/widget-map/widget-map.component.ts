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
import * as mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

import {Activity, listTypesIcons} from "../../../../../models/trip.model";
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
export class WidgetMapComponent implements OnInit {

  map : mapboxgl.Map | undefined

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.initMap()
  }


  initMap() {

    const latitude = this.tripService.tripSelected()?.latitude
    const longitude = this.tripService.tripSelected()?.longitude

    this.map = new mapboxgl.Map({
      attributionControl: false,
      container: 'map-widget',
      center: [2.2990098595619206, 49.89863424051644],
      zoom: 2,
      maxZoom: 18,
      accessToken: 'pk.eyJ1IjoicmVteWNhcyIsImEiOiJjbGxzY3Y3c3YweDB2M2VwcHhzOTh2aGE2In0.g4kYgrf9FzOCjuEmHW8-Qg',
      //style: 'mapbox://styles/mapbox/streets-v12',
      //pitchWithRotate: false,
    })
      .addControl(new mapboxgl.FullscreenControl())


    // If trip has coordinates (center on city/country...)
    if(latitude && longitude) {
      this.map.setCenter([longitude, latitude]).setZoom(9)
    }

    this.showActivitiesMarker()


  }

  showActivitiesMarker() {
    this.tripService.tripSelected()?.activities?.forEach(activity => {
      if(this.map && (activity.latitude && activity.longitude)) {
        const marker = new mapboxgl.Marker(this.getMarkerIcon(activity))
          .setLngLat([activity.longitude, activity.latitude])
          .setPopup(
            new mapboxgl.Popup()
              .setHTML(
                `
                <div class="flex items-center gap-2">
                    <img src="${this.getIconByType(activity.icon)}" class="w-[25px] h-[25px]" alt="" />
                      <h4 class="text-[1.15rem]">${activity.name}</h4>
                </div>
                <p class="first-letter:uppercase mt-2">
                  <span>${dayjs(activity.start).locale(fr).format('dddd DD MMMM à HH:mm')}</span>
                </p>
            `
          ))

          .addTo(this.map);



      }
    })

  }

  getMarkerIcon(activity: Activity) {
    const el = document.createElement('div')
    el.className = 'w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center'
    el.innerHTML = `<img src="${this.getIconByType(activity.icon)}" class="w-[25px] h-[25px]" alt="" />`

    return el
  }

  getIconByType(icon: string) {
    const selectedType = listTypesIcons.find(lt => lt.code === icon)

    if(selectedType) {
      return selectedType.icon
    }

    return "plane"
  }
}

import {
  afterNextRender,
  AfterRenderPhase,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {apiEndpoint} from "../constants";
import {lastValueFrom} from "rxjs";
import {toast} from "ngx-sonner";

@Component({
  selector: 'app-cloropeth-map',
  standalone: true,
  imports: [],
  templateUrl: './cloropeth-map.component.html',
  styleUrl: './cloropeth-map.component.scss'
})
export class CloropethMapComponent {

  countriesVisited: string[] = []

  constructor(private http: HttpClient) {
    afterNextRender(async () => {

      //@ts-ignore
      const jsvectormap = await import('jsvectormap/dist/js/jsvectormap.js').then(m => m.default);
      //@ts-ignore
      await import('../../../lib/map/world.js')


      const app = this

      this.countriesVisited = await app.getAllCountriesVisited()
      const map = new jsvectormap({
        selector: '#map',
        zoomOnScrollSpeed: 0.5,
        regionStyle: {
          selected: { fill: '#B6D89F' },
        },
        selectedRegions: this.countriesVisited,
        regionsSelectable: true,
        onLoaded(map: any) {
          window.addEventListener('resize', () => {
            map.updateSize()
          })
        },
        onRegionTooltipShow(event: any, tooltip: any) {
          tooltip.css({ backgroundColor: '#12B981' })
        },
        onRegionClick(event: any, code: string) {
          if(!app.countriesVisited.includes(code)) {
            app.handleCreateCountryVisited(code)
          }
          else {
            app.handleDeleteCountryVisited(code)
          }
        }
      });
    }, {phase: AfterRenderPhase.Read});
  }

  async getAllCountriesVisited() {
    const res = await lastValueFrom(this.http.get<string[]>(`${apiEndpoint}/countries/`))
    return res
  }

  handleCreateCountryVisited(country_code: string) {
    this.http.post<any>(`${apiEndpoint}/countries/`, {
      country_code: country_code
    })
      .subscribe({
        next: res => {
          if(res.countryCode) {
            toast.success('Nouveau pays ajouté')
            this.countriesVisited.push(res.countryCode)
          }
        }
      })
  }

  handleDeleteCountryVisited(country_code: string) {
    this.http.delete<any>(`${apiEndpoint}/countries/${country_code}`)
      .subscribe({
        next: res => {
          if(res.message) {
            toast.success('Pays supprimé')
            this.countriesVisited = this.countriesVisited.filter(country => country !== res.countryCode);
          }
        }
      })
  }

}

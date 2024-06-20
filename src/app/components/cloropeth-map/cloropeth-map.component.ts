import {afterNextRender, AfterRenderPhase, Component} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {toast} from "ngx-sonner";
import {CountryVisitedService} from "../../services/country-visited/country-visited.service";

@Component({
  selector: 'app-cloropeth-map',
  standalone: true,
  imports: [],
  templateUrl: './cloropeth-map.component.html',
  styleUrl: './cloropeth-map.component.scss'
})
export class CloropethMapComponent {

  constructor(private countryVisitedService: CountryVisitedService) {
    afterNextRender(async () => {

      //@ts-ignore
      const jsvectormap = await import('jsvectormap/dist/js/jsvectormap.js').then(m => m.default);
      //@ts-ignore
      await import('../../../../lib/map/world.js')


      const app = this

      const map = new jsvectormap({
        selector: '#map',
        zoomOnScrollSpeed: 0.5,
        regionStyle: {
          selected: { fill: '#B6D89F' },
        },
        selectedRegions: await app.getAllCountriesVisited(),
        regionsSelectable: true,
        onLoaded(map: any) {
          window.addEventListener('resize', () => {
            map.updateSize()
          })
        },
        onRegionTooltipShow(event: any, tooltip: any) {
          tooltip.css({ backgroundColor: '#12B981' })
        },
        onRegionSelected(code: string, isSelected: boolean) {
          if(isSelected) {
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
    return await lastValueFrom(this.countryVisitedService.getCountriesVisited())
  }

  handleCreateCountryVisited(country_code: string) {
    this.countryVisitedService.persistCountryVisited(country_code)
      .subscribe({
        next: res => {
          if(res.countryCode) {
            toast.success('Nouveau pays ajouté')
          }
        }
      })
  }

  handleDeleteCountryVisited(country_code: string) {
    this.countryVisitedService.deleteCountryVisited(country_code)
      .subscribe({
        next: res => {
          if(res.message) {
            toast.success('Pays supprimé')
          }
        }
      })
  }

}

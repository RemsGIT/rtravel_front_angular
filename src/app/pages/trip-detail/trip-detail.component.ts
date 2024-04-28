import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { NgOptimizedImage } from "@angular/common";
import {TripService} from "../../services/trip/trip.service";
import {AuthService} from "../../services/auth/auth.service";
import {TripRecapCardComponent} from "../../components/trip/trip-recap-card/trip-recap-card.component";
import {TripNavigationTabsComponent} from "../../components/trip/trip-navigation-tabs/trip-navigation-tabs.component";
import {toast} from "ngx-sonner";
import {apiEndpoint, constants} from "../../constants";

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TripRecapCardComponent,
    TripNavigationTabsComponent
],
  templateUrl: './trip-detail.component.html',
})
export class TripDetailComponent implements OnInit{
  authService = inject(AuthService)
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, protected tripService: TripService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''

    this.tripService.getTripById(id)
      .subscribe({
        next: (response) => {
          this.tripService.tripSelected.set(response)

          return response
        },
        error: err => {
          switch(err.status) {
            case 404: toast.error("Le voyage n'existe pas"); break;
            case 400: toast.warning("Tu n'as pas l'autorisation de voir ce voyage"); break;
          }
          this.router.navigateByUrl('/accueil')
        }
      })


  }

  protected readonly constants = constants;
  protected readonly apiEndpoint = apiEndpoint;
}

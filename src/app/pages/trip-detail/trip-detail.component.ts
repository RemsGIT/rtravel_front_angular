import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { NgOptimizedImage } from "@angular/common";
import {TripService} from "../../services/trip/trip.service";
import {AuthService} from "../../services/auth/auth.service";
import {TripRecapCardComponent} from "../../components/trip/trip-recap-card/trip-recap-card.component";
import {TripNavigationTabsComponent} from "../../components/trip/trip-navigation-tabs/trip-navigation-tabs.component";

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
  }
}

import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {TabMenuModule} from "primeng/tabmenu";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ProfileStatisticsComponent} from "../../profile/profile-statistics/profile-statistics.component";
import {TabViewModule} from "primeng/tabview";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-landing-page-features',
  standalone: true,
  imports: [
    TabMenuModule,
    Button,
    InputTextModule,
    PaginatorModule,
    ProfileStatisticsComponent,
    TabViewModule,
    NgOptimizedImage
  ],
  templateUrl: './landing-page-features.component.html',
  styleUrl: './landing-page-features.component.scss'
})
export class LandingPageFeaturesComponent implements OnInit{
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Planification', icon: 'pi pi-home' },
      { label: 'Collaboration', icon: 'pi pi-chart-line' },
      { label: 'Dépenses', icon: 'pi pi-list' },
    ]
  }

}

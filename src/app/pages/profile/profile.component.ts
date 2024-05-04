import {Component, inject, OnInit} from '@angular/core';
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {ProfileTabsComponent} from "../../components/profile/profile-tabs/profile-tabs.component";
import {CardModule} from "primeng/card";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    TabMenuModule,
    ProfileTabsComponent,
    CardModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: '../../components/profile/profile-tabs/profile-tabs.scss'
})
export class ProfileComponent  {

  authService = inject(AuthService)



}

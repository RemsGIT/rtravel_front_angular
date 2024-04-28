import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {AvatarProfileDropdownComponent} from "./avatar-profile-dropdown/avatar-profile-dropdown.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AvatarProfileDropdownComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}

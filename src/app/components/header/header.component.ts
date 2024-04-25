import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {AvatarProfileDropdownComponent} from "./avatar-profile-dropdown/avatar-profile-dropdown.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AvatarProfileDropdownComponent
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}

import {Component, inject, OnInit} from '@angular/core';
import {MenuItem, SharedModule} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {LucideAngularModule} from "lucide-angular";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-avatar-profile-dropdown',
  standalone: true,
  imports: [
    MenuModule,
    LucideAngularModule,
    SharedModule
  ],
  templateUrl: './avatar-profile-dropdown.component.html',
})
export class AvatarProfileDropdownComponent implements OnInit{
  authService = inject(AuthService)
  router = inject(Router)

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Mon profil',
        icon: 'user',
        command: () => {
          this.router.navigateByUrl('/profil')
        }
      },
      {
        label: 'Mes voyages',
        icon: 'tent-tree',
        command: () => {
          this.router.navigateByUrl('/accueil')
        }
      },
      {
        separator: true,
      },
      {
        label: 'Me déconnecter',
        icon: 'log-out',
        command: () => {
          this.authService.logout().subscribe({
            next: () => this.router.navigateByUrl('/connexion')
          })
        }
      }
    ]
  }
}

import {Component, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {LucideAngularModule} from "lucide-angular";
import {IsActiveMatchOptions, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {MenuModule} from "primeng/menu";
import {MenuItem, SharedModule} from "primeng/api";
import {resizeTextByLength} from "../../../helpers/string-helper";

@Component({
  selector: 'app-menu-sidebar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    LucideAngularModule,
    RouterLinkActive,
    RouterLink,
    MenuModule,
    SharedModule
  ],
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.scss'
})
export class MenuSidebarComponent implements OnInit{

  router = inject(Router)
  authService = inject(AuthService)

  items: MenuItem[] = []


  ngOnInit() {
    this.items = [
      {
        label: 'Me déconnecter',
        icon: 'log-out',
        command: () => {
          this.authService.logout().subscribe({
            next: () => this.router.navigateByUrl('/connexion')
          })
        }
      }
    ];
  }


  protected readonly resizeTextByLength = resizeTextByLength;
    protected readonly JSON = JSON;
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `

  <header *ngIf="!isHomePage()">
    <h1>CandidaTrace</h1>

    <nav  *ngIf="!isLogginPage()">
        <a routerLink="/tableau-de-bord" routerLinkActive="active">Mon Tableau de bord</a>
        <a routerLink="/candidatures" routerLinkActive="active">Mes candidatures</a>
        <a routerLink="/profil/1" routerLinkActive="active">Mon profil</a>
        <a routerLink="/documents" routerLinkActive="active">Mes documents</a>
        <a routerLink="/deconnexion" routerLinkActive="active" (click)="logout()">Deconnexion</a>
    </nav>

    </header>
  `,
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  constructor(private router: Router) { }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  isLogginPage(): boolean {
    return this.router.url === '/connexion';
  }

  logout(): void {
    // Supprime l'email de l'utilisateur connecté du stockage local
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }

}

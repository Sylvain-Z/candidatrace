import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLinkActive } from '@angular/router';

import { UsersService } from '../../services/users/users.service';
import { Users } from '../../services/users/users.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive ],
  template: `

  <header *ngIf="!isHomePage()">
    <h1>CandidaTrace</h1>

    <nav  *ngIf="!isLogginPage()">
        <a [routerLink]="'/tableau-de-bord/' + user.id" routerLinkActive="active">Mon Tableau de bord</a>
        <a [routerLink]="'/candidatures/' + user.id" routerLinkActive="active">Mes candidatures</a>
        <a [routerLink]="'/profil/' + user.id" routerLinkActive="active">Mon profil</a>
        <a [routerLink]="'/documents/' + user.id" routerLinkActive="active">Mes documents</a>
        <a routerLink="/deconnexion" routerLinkActive="active" (click)="logout()">Deconnexion</a>
    </nav>

    </header>
  `,
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router) { }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  isLogginPage(): boolean {
    return this.router.url === '/connexion' || this.router.url === '/creer-mon-compte';
  }

  logout(): void {
    // Supprime l'email de l'utilisateur connecté du stockage local
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }


  myUserEmail: string | null = localStorage.getItem('loggedInUser');
  user!: Users;

  ngOnInit(): void {

    if (this.myUserEmail === null) {
      return;
    } else {

      this.userService.getUserByEmail(this.myUserEmail).subscribe(user => {
        this.user = user;
      });

    }

  }

}

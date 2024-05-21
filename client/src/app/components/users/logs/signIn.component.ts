import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-signIn',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  template: `

    <section class="dashboard-section">
      <h2>Bienvenue</h2>

      <h3>Connectez-vous</h3>

      <form class="profil-form" [formGroup]="signinForm" (ngSubmit)="signin()">

        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email" placeholder="Email">

        <label for="password">Mot de passe</label>
        <input type="password" id="password" formControlName="password"   placeholder="Mot de passe">

        <p class="green-msg">{{message}}</p>

        <button type="submit" class="action-btn turquoise">Se connecter</button>

        <p>Vous n'aver pas de compte ?</p>
        <p class="green-msg"><a routerLink="/creer-mon-compte" routerLinkActive="active">Créez votre compte</a></p>

      </form>

    </section>
  `,
  styles: ``
})
export default class SignInComponent {

  constructor(private userService: UsersService, private router: Router) { }

  message: string = "";

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
  })

  signin(): void {

    if (this.signinForm.valid) {

      const email = this.signinForm.get('email')?.value;
      const password = this.signinForm.get('password')?.value;

      if (email === 'email@email.com' && password === 'azertyui') {
        localStorage.setItem('loggedInUser', email);
        this.message = "Vous êtes conneté";

        this.userService.getUserByEmail(email).subscribe(user => {
          if (user) {
            this.router.navigate([`/tableau-de-bord/${user.id}`]);
          } else {
            return
          }
        });

      } else {
        this.message = "L'email ou le mot de passe est incorrect";
      }
    } else {
      this.message = "L'email ou le mot de passe est incorrect";
    }
  };


}

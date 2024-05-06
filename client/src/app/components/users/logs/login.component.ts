import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `

    <section class="dashboard-section">
      <h2>Bienvenue</h2>

      <h3>Pour commencer veuillez vous connecter</h3>

      <form class="profil-form" [formGroup]="loginForm" (ngSubmit)="login()">

        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email">

        <label for="password">Mot de passe</label>
        <input type="password" id="password" formControlName="password">

        <p class="validation-msg">{{message}}</p>

        <button type="submit" class="action-btn">Se connecter</button>
      </form>

    </section>
  `,
  styles: ``
})
export default class LoginComponent {

  constructor(private router: Router) { }

  message: string = "";
  // passwordRegex: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,12}$/;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [/* Validators.pattern(this.passwordRegex), */ Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
  })

  login(): void  {

    if (this.loginForm.valid) {
      
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (email === 'email@email.com' && password === 'azertyui') {
        localStorage.setItem('loggedInUser', email);
        this.router.navigate(['/tableau-de-bord']);
        this.message = "Vous êtes connecté";
      } else {
        this.message = "L'email ou le mot de passe est incorrect";
      }
    } else {
      this.message = "L'email ou le mot de passe est incorrect";
    }
  };


}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../services/users/users.model';

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
        <p class="red-msg">{{message2}}</p>

        <button type="submit" class="action-btn signin">Se connecter</button>

        <p>Vous n'avez pas de compte ?</p>
        <p class="green-msg"><a routerLink="/creer-mon-compte" routerLinkActive="active">Créez votre compte</a></p>

      </form>

    </section>
  `,
  styles: ``
})
export default class SignInComponent {

  constructor(private userService: UsersService, private router: Router) { }

  message: string = "";
  message2: string = "";
  user!: Users;

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
  })

  signin(): void {
    if (this.signinForm.valid) {
      const email = this.signinForm.get('email')?.value;
      const password = this.signinForm.get('password')?.value;

      if (email && password) {
        const userAuth: Users = {
          firstname: "",
          lastname: "",
          city: "",
          phone: "",
          email: email,
          password: password,
          profile_pic: ""
        };

        this.userService.signIn(userAuth).subscribe({
          next: response => {
            this.message = response;
            this.userService.getUserByEmail(email).subscribe(user => {
              if (user) {
                localStorage.setItem('loggedInUser', email);
                this.router.navigate([`/tableau-de-bord/${user.id}`]);
              } else {
                this.message2 = "Utilisateur non trouvé.";
              }
            });
          },
          error: error => {
            if (error.status === 401) {
              this.message2 = "L'email ou le mot de passe est incorrect.";
            } else {
              console.log(error.status)
              this.message2 = "Une erreur s'est produite lors de la connexion.";
            }
          }
        });
      }
    } else {
      this.message2 = "L'email ou le mot de passe est incorrect.";
    }
  }
}

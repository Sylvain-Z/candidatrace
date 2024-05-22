import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../services/users/users.model';

@Component({
  selector: 'app-signUp',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  template: `

    <section class="dashboard-section">
      <h2>Bienvenue</h2>

      <h3>Créez un compte</h3>

      <form class="profil-form" [formGroup]="signupForm" (ngSubmit)="sigup()">

        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email" placeholder="Email">

        <label for="password">Mot de passe</label>
        <input type="password" id="password" formControlName="password" placeholder="Mot de passe">

        <p class="green-msg">{{message}}</p>
        <p class="red-msg">{{message2}}</p>

        <button type="submit" class="action-btn signup">S'enregistrer</button>
        
        <p>Vous avez déjà un compte ?</p>
        <p class="green-msg"><a routerLink="/connexion">Se connecter</a></p>
      </form>

    </section>
  `,
  styles: ``
})
export default class SignUpComponent {

  constructor(private userService: UsersService, private router: Router) { }

  message: string = "";
  message2: string = "";
  passwordRegex: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,12}$/;

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(this.passwordRegex), Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
  })

  sigup(): void {

    if (this.signupForm.valid) {

      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;

      if (email && password) {

        const newUser: Users = {
          firstname: "",
          lastname: "",
          city: "",
          phone: "",
          email: email,
          password: password,
          profile_pic: "",
        };

        this.userService.createUser(newUser).subscribe({

          next: (response) => {
            this.message = response;
            this.router.navigate(['/connexion']);
          },
          error: (error) => {
            if (error.status === 409) {
              this.message2 = error.error;
            } else {
              this.message2 = "Une erreur s'est produite lors de la création du compte.";
            }
          }

        });
      }

    } else {

      if (!this.signupForm.get('email')?.valid) {
        this.message2 = "L'email n'est pas valide.";
      } else if (!this.signupForm.get('password')?.valid) {
        this.message2 = "Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial.";
      } else {
        this.message2 = "Le formulaire n'est pas valide.";
      }
  }


};


}

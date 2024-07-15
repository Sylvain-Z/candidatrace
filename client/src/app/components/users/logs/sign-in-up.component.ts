import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../services/users/users.model';

@Component({
  selector: 'app-sign-in-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  template: `

    <section class="logs-sections">
      <h2 class="logs-sections-h2">Bienvenue</h2>
      
      <article class="signin">

        <h3>Connectez-vous</h3>

        <form class="profil-form" [formGroup]="signinForm" (ngSubmit)="signin()" *ngIf="signinOpen">

          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" placeholder="Email">

          <label for="password">Mot de passe</label>
          <input type="password" id="password" formControlName="password"   placeholder="Mot de passe">

          <p class="green-msg">{{message}}</p>
          <p class="red-msg">{{message2}}</p>

          <button type="submit" class="confirm-btn">Se connecter</button>
        </form>
          
          <p class="switch-in-up" *ngIf="!signinOpen">Vous avez déjà un compte ?</p>
          <p class="switch-in-up" (click)="toggleForms()" *ngIf="!signinOpen">Connectez-vous</p>
          <button class="switch-in-up" (click)="toggleForms()" type="button"  *ngIf="!signinOpen">&#65087;</button>
          <button class="switch-in-up" (click)="toggleForms()" type="button"  *ngIf="signinOpen">&#65088;</button>

      </article>

      <article class="signup">
        <h3>Créez un compte</h3>

        <form class="profil-form" [formGroup]="signupForm" (ngSubmit)="sigup()" *ngIf="!signinOpen">

          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" placeholder="Email">

          <label for="password">Mot de passe</label>
          <input type="password" id="password" formControlName="password" placeholder="Mot de passe">

          <p class="green-msg">{{message3}}</p>
          <p class="red-msg">{{message4}}</p>

          <button type="submit" class="confirm-btn">S'enregistrer</button>
        </form>
        
          <p class="switch-in-up" *ngIf="signinOpen">Vous n'avez pas de compte ?</p>
          <p  class="switch-in-up" (click)="toggleForms()" *ngIf="signinOpen">Créez votre compte</p>
          <button class="switch-in-up" (click)="toggleForms()" type="button"  *ngIf="!signinOpen">&#65087;</button>
          <button class="switch-in-up" (click)="toggleForms()" type="button"  *ngIf="signinOpen">&#65088;</button>
      
      </article>

    </section>
  `,
  styles: ``
})
export default class SignInUpComponent implements OnInit {

  message: string = "";
  message2: string = "";
  message3: string = "";
  message4: string = "";
  user!: Users;
  myUserEmail: string | null = localStorage.getItem('loggedInUser');

  constructor(private userService: UsersService, private router: Router) { }

  signinOpen: boolean = true;

  toggleForms(): void {
    this.signinOpen = !this.signinOpen;
  }
  
  ngOnInit(): void {

    if (this.myUserEmail === null) {
      return;
    } else {

      this.userService.getUserByEmail(this.myUserEmail).subscribe(user => {
        if (user) {
          this.router.navigate([`/tableau-de-bord/${user.id}`]);
        } else {
          return
        }
      });

    }

  }

  passwordRegex: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,12}$/;

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
  })
  
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(this.passwordRegex), Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
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
              console.log("signin")
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
            this.message3 = response;
            this.router.navigate(['/connexion']);
          },
          error: (error) => {
            if (error.status === 409) {
              this.message4 = error.error;
            } else {
              this.message4 = "Une erreur s'est produite lors de la création du compte.";
            }
          }

        });
      }

    } else {

      if (!this.signupForm.get('email')?.valid) {
        this.message4 = "L'email n'est pas valide.";
      } else if (!this.signupForm.get('password')?.valid) {
        this.message4 = "Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial.";
      } else {
        this.message2 = "Le formulaire n'est pas valide.";
      }
    }


  };

}


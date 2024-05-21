import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../services/users/users.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `

    <section class="dashboard-section">
      <h2>Mon profil</h2>
      
      <img
        class="profilePic"
        [src]="userInfos.profile_pic === '' ? '../../assets/images/profilePic.png' : '../../assets/images/'+userInfos.profile_pic"
        alt="photo de profil"
      />

      <form class="profil-form" [formGroup]="profilForm">
        <label for="prenom">Prénom</label>
        <input
          type="text"
          id="prenom"
          [className]="editIsActive ? '' : 'disabled-input'"
          [attr.disabled]="editIsActive ? null : true"
          formControlName="firstname"
          placeholder="Prénom"
        >

        <label for="nom">Nom</label>
        <input
          type="text"
          id="nom"
          [className]="editIsActive ? '' : 'disabled-input'"
          [attr.disabled]="editIsActive ? null : true"
          formControlName="lastname"
          placeholder="Nom"
        >

        <label for="ville">Ville</label>
        <input
          type="text"
          id="ville"
          [className]="editIsActive ? '' : 'disabled-input'"
          [attr.disabled]="editIsActive ? null : true"
          formControlName="city"
          placeholder="Ville"
        >
        
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          [className]="editIsActive ? '' : 'disabled-input'"
          [attr.disabled]="editIsActive ? null : true"
          formControlName="email"
          placeholder="Email"
        >

        <label for="telephone">Téléphone</label>
        <input
          type="tel"
          id="telephone"
          [className]="editIsActive ? '' : 'disabled-input'"
          [attr.disabled]="editIsActive ? null : true"
          formControlName="phone"
          placeholder="Téléphone"
          >

        <p class="validation-msg">{{message}}</p>

        <button [className]="editIsActive ? 'hidden' : 'action-btn'" (click)="toggleEdit()" >Modifier</button>
        <button [className]="editIsActive ? 'action-btn' : 'hidden'" (click)="toggleEdit()">Valider</button>
        <button [className]="editIsActive ? '' : 'hidden'" (click)="toggleEdit()">Annuler</button>
      </form>

      <!-- <p>Le formulaire est valide : {{ profilForm.valid }}</p> -->
      <p>editIsActive : {{ editIsActive }}</p>

    </section>
`,
})

export default class ProfilComponent implements OnInit {

  userInfos!: Users;
  userEdit!: Users;
  editIsActive: boolean = true;
  message: string = "";

  constructor(private route: ActivatedRoute, private userService: UsersService) { }

  profilForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    city: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.pattern(/^\d+$/), Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
  })

  toggleEdit(): void {
    this.editIsActive = !this.editIsActive;
  };

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const userId = params['id'];

      this.userService.getUserById(userId).subscribe(user => {

        console.log('Données du user :', user);

        if (user) {
          this.profilForm.patchValue({
            firstname: user.firstname,
            lastname: user.lastname,
            city: user.city,
            email: user.email,
            phone: user.phone,
          });
          this.userInfos = user;
          console.log('Données du userInfos :', this.userInfos);
          this.toggleEdit();
        } else {
          console.log('Utilisateur non trouvé. Id :', userId);
        }
      });
    });
  };

};

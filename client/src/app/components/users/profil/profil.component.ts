import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
/* import { MatDialog } from '@angular/material/dialog';
import { DeletePopUpComponent } from './delete-pop-up.component'; */

import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../services/users/users.model';

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

      <form class="profil-form" [formGroup]="profilForm" (ngSubmit)="updateProfil()">
        <label for="prenom">Prénom*</label>
        <input
          type="text"
          id="prenom"
          formControlName="firstname"
          placeholder="Prénom"
        >

        <label for="nom">Nom*</label>
        <input
          type="text"
          id="nom"
          formControlName="lastname"
          placeholder="Nom"
        >

        <label for="ville">Ville</label>
        <input
          type="text"
          id="ville"
          formControlName="city"
          placeholder="Ville"
        >
        
        <label for="email">Email*</label>
        <input
          type="email"
          id="email"
          formControlName="email"
          placeholder="Email"
        >

        <!-- <label for="password">Mot de Passe*</label>
        <input
          type="texte"
          id="password"
          formControlName="password"
          placeholder="Mot de Passe"
        > -->

        <label for="telephone">Téléphone</label>
        <input
          type="tel"
          id="telephone"
          formControlName="phone"
          placeholder="Téléphone"
          >

        <p class="green-msg">{{message}}</p>
        <p class="red-msg">{{message2}}</p>

        <button class="action-btn" type="submit">Valider</button>
        
        <p [className]="deleteBtnVisible ? 'hidden' : 'red-altert'" (click)="displayDeleteBtn()">Attention</p>

        <p [className]="deleteBtnVisible ? 'red-altert cancel-btn' : 'hidden'" (click)="displayDeleteBtn()">Annuler</p>

        <p [className]="deleteBtnVisible ? 'red-altert delete-btn' : 'hidden'" mat-button (click)="deletePopup()">Supprimer mon compte</p>

      </form>

    </section>
`,
})

export default class ProfilComponent implements OnInit {

  userInfos!: Users;
  deleteBtnVisible: boolean = false;
  message: string = "";
  message2: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private userService: UsersService/* , private dialog: MatDialog */) { }

  profilForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    /* password: new FormControl(''), */
    phone: new FormControl('', [Validators.pattern(/^\d+$/), Validators.maxLength(10), Validators.minLength(10), Validators.required]),
  })

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const userId = params['id'];

      this.userService.getUserById(userId).subscribe(user => {

        if (user) {
          this.profilForm.patchValue({
            firstname: user.firstname,
            lastname: user.lastname,
            city: user.city,
            email: user.email,
            /* password: user.password, */
            phone: user.phone,
          });
          this.userInfos = user;
        } else {
          this.message = 'Utilisateur non trouvé.';
        }
      });
    });
  };


  updateProfil(): void {
    if (this.profilForm.valid) {

      if (this.userInfos && this.userInfos.id) {

        const userAuth: Partial<Users> = {
          firstname: this.profilForm.value.firstname ?? '',
          lastname: this.profilForm.value.lastname ?? '',
          city: this.profilForm.value.city ?? '',
          email: this.profilForm.value.email ?? '',
          phone: this.profilForm.value.phone ?? ''
        };

        this.userService.updateUser(this.userInfos.id, userAuth as Users).subscribe({

          next: (response) => {
            this.message = response;
            this.message2 = "";

            const email = this.profilForm.get('email')?.value;
            if (email) {
              localStorage.setItem('loggedInUser', email);
            }

          },
          error: (error) => {
            if (error.status === 409) {
              this.message2 = error.error;
            } else {
              this.message2 = "Une erreur s'est produite lors de la création du compte.";
            }
          }

        });

      } else {
        this.message2 = "Utilisateur non trouvé ou ID non défini.";
      }
    } else {

      if (!this.profilForm.get('email')?.valid) {
        this.message2 = "L'email n'est pas valide.";
      } else if (!this.profilForm.get('phone')?.valid) {
        this.message2 = "Le numéro de téléphone doit correspondre au format 10 chiffres.";
      } else {
        this.message2 = "Le formulaire n'est pas valide.";
      }

    }
  };

  displayDeleteBtn(): void {
    this.deleteBtnVisible = !this.deleteBtnVisible;
  }

  deletePopup(): void {

    const confirmation = window.confirm("Cette action est irréverssible. Êtes-vous sûr de vouloir supprimer votre compte ?");

    const userId = this.userInfos.id;
    console.log(userId)

    if (confirmation) {

      if (userId) {
        this.userService.deleteUser(userId).subscribe(() => {

        });
        this.displayDeleteBtn();
        localStorage.removeItem('loggedInUser');
        this.router.navigate([`/`]);
      };


    } else {
      return;
    }

  }

/*   deletePopup(): void {
    const dialogRef = this.dialog.open(DeletePopUpComponent, {
      width: "340px",
      data: "Cette action est irréverssible. Êtes-vous sûr de vouloir supprimer votre compte ?"
    });

    const userId = this.userInfos.id;
    console.log(userId)

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Appeler la méthode de suppression
        this.deleteAccount();
      }
    });

  }

  deleteAccount() {

  } */



};

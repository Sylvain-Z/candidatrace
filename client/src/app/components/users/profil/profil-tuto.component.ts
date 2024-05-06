import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users/users-tuto.service';
import { Users } from        '../../../services/users/users-tuto.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `

    <section class="dashboard-section">
      <h2>Mon profil</h2>
      
      <!-- formControlName fonctionne ici un peu comme la gestion d'une state pour un formulaire, -->
      <!-- il faut donc remplir la methode FormControl correspondante pour l'injecter la donnée dans la value de l'input -->
      <!-- alternative sans vérification des inputs -->
      <!-- <input type="text" id="nom" value="{{user.prenom}}"> -->

      <form class="profil-form" [formGroup]="profilForm" (ngSubmit)="onSubmit()">
        <label for="prenom">Prénom</label>
        <input type="text" id="prenom" [attr.disabled]="editIsActive ? null : true" formControlName="prenom">

        <label for="nom">Nom</label>
        <input type="text" id="nom" [attr.disabled]="editIsActive ? null : true" formControlName="nom">

        <label for="ville">Ville</label>
        <input type="text" id="ville" [attr.disabled]="editIsActive ? null : true" formControlName="ville">
        
        <label for="email">Email</label>
        <input type="email" id="email" [attr.disabled]="editIsActive ? null : true" formControlName="email">

        <label for="telephone">Téléphone</label>
        <input type="tel" id="telephone" [attr.disabled]="editIsActive ? null : true" formControlName="telephone">

        <p class="validation-msg">{{message}}</p>

        <button [className]="editIsActive ? 'hidden' : 'edit-btn'" (click)="toggleEdit()"  type="button">Modifier</button>
        <button [className]="editIsActive ? 'edit-btn' : 'hidden'" (click)="toggleEdit()" type="submit">Valider</button>
        <button [className]="editIsActive ? '' : 'hidden'" (click)="toggleEdit()" type="button">Annuler</button>
      </form>

      Resultat : {{editResult | json }}
      <p>Le formulaire est valide : {{ profilForm.valid }}</p>
      <p>editIsActive : {{ editIsActive }}</p>

    </section>
`,
})

export default class ProfilComponent implements OnInit {

  user!: Users;
  userEdit!: Users;
  editIsActive: boolean = true;  /* ça fonctionne dans cet état */
  editResult! : Observable<Users>;
  message : string = "";

  constructor(private route: ActivatedRoute, private userService: UsersService) { }

  profilForm = new FormGroup({
    prenom: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    ville: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    telephone: new FormControl('', [Validators.pattern(/^\d+$/), Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
  })

  toggleEdit() {
    this.editIsActive = !this.editIsActive;
  };

  onSubmit() {

    const user: Users = {
      id: this.user.id,
      prenom: this.profilForm.value.prenom!,
      nom: this.profilForm.value.nom!,
      ville: this.profilForm.value.ville!,
      email: this.profilForm.value.email!,
      telephone: this.profilForm.value.telephone!,
    }
    this.editResult = this.userService.updateUser(user.id, user);
    this.message = "Informations mises à jour";
    
  };

  ngOnInit(): void {

    console.log('ngOnInit(): void {}');

    this.route.params.subscribe(params => {
      const userId = +params['id']; // Récupère l'ID de l'URL et le convertit en nombre avec le + qui équivaut à parseInt

      this.userService.getUserById(userId).subscribe(user => {

        console.log('Données de l\'utilisateur :', user);

        if (user) {
          this.profilForm.patchValue({
            prenom: user.prenom,
            nom: user.nom,
            ville: user.ville,
            email: user.email,
            telephone: user.telephone,
          });

          this.user = user;
          this.toggleEdit();  // ne fonctionne qu'après que les données aient été injectés
          /* ça fonctionne que en initiant editIsActive = true et en exécutant le toggle au montage du composant.
          Si editIsActive = false au montage du composant sans toggle, les inputs sont actifs */

        } else {
          console.log('Utilisateur non trouvé. Id :', userId);
        }
      });

    });
  };

};

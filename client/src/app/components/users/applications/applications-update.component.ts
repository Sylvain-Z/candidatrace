import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { Application } from '../../../services/applications/applications.model';
import { ApplicationsService } from '../../../services/applications/applications.service';

@Component({
  selector: 'app-applications-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
    <section class="application-section">
      <h2>Modification de la candidature</h2>

      <form class="profil-form" [formGroup]="applicationForm" (ngSubmit)="updateApplication()" >

        <label for="company_name">Nom de l'entreprise</label>
        <input type="text" id="company_name" formControlName="company_name" placeholder="Nom de l'entreprise" maxlength="50">

        <label for="website">Site de l'entreprise</label>
        <input type="text" id="website" formControlName="website" placeholder="Site de l'entreprise">

        <label for="application_link">Url de l'offre</label>
        <input type="text" id="application_link" formControlName="application_link" placeholder="Url de l'offre">

        <label for="application_date">Date la candidature</label>
        <input type="date" id="application_date" formControlName="application_date">

        <label for="note">Commentaire</label>
        <input type="text" id="note" formControlName="note" placeholder="Commentaire" maxlength="200">

        <label for="first_relaunch">Relancé le</label>
        <input type="date" id="first_relaunch" formControlName="first_relaunch" >

        <label for="second_relaunch">Seconde relance</label>
        <input type="date" id="second_relaunch" formControlName="second_relaunch" >

        <label for="interview_date">Date de l'entretien</label>
        <input type="date" id="interview_date" formControlName="interview_date" >

        <label for="final_response">Réponse</label>
        <select id="final_response" formControlName="final_response">
          <option [value]="0">En attente</option>
          <option [value]="1">Oui</option>
          <option [value]="2">Non</option>
        </select>

        <label for="final_response_date">Date de la réponse</label>
        <input type="date" id="final_response_date" formControlName="final_response_date" >

        <button type="submit" class="confirm-btn">Modifier</button>
      </form>

    </section>
  `,
  styles: ``
})

export class ApplicationsUpdateComponent implements OnInit {

  message: string = "";
  message2: string = "";
  message3: string = "";
  message4: string = "";
  application!: Application;

  constructor(private applicationsService: ApplicationsService, private router: Router, private route: ActivatedRoute) { }

  applicationForm = new FormGroup({
    company_name: new FormControl('', [Validators.maxLength(50)]),
    website: new FormControl('', [Validators.pattern('https?://.+')]),
    application_link: new FormControl('', [Validators.pattern('https?://.+')]),
    application_date: new FormControl(''),
    note: new FormControl('', [Validators.maxLength(200)]),
    first_relaunch: new FormControl(''),
    second_relaunch: new FormControl(''),
    interview_date: new FormControl(''),
    final_response: new FormControl<number>(0),
    final_response_date: new FormControl('')
  })

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const userId = params['id'];
      const applicationId = params['application_id'];

      this.applicationsService.getApplicationsByUserIdAndId(userId, applicationId).subscribe(application => {

        if (application) {
          this.applicationForm.patchValue({
            company_name: application.company_name,
            website: application.website,
            application_link: application.application_link,
            application_date: this.convertToDate(application.application_date),
            note: application.note,
            first_relaunch: this.convertToDate(application.first_relaunch),
            second_relaunch: this.convertToDate(application.second_relaunch),
            interview_date: this.convertToDate(application.interview_date),
            final_response: application.final_response,
            final_response_date: this.convertToDate(application.final_response_date),
          });
          this.application = application;
        } else {
          this.message = 'Candidature non trouvé';
        }
      });
    });
  };

  convertToDate(dateString: string | null): string | null {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : null;
  }

  updateApplication(): void {
    if (this.applicationForm.valid) {

      const finalResponseControl = this.applicationForm.get('final_response');
      const finalResponse = finalResponseControl && finalResponseControl.value !== null ? +finalResponseControl.value : 0; // vérification pour que typescript soit sur que la valeur n'est pas null avant de l'utiliser
    
      const application: Application = {
        id: this.application.id,
        company_name: this.applicationForm.get('company_name')?.value || '',
        website: this.applicationForm.get('website')?.value || '',
        application_link: this.applicationForm.get('application_link')?.value || '',
        application_date: this.applicationForm.get('application_date')?.value || '',
        note: this.applicationForm.get('note')?.value || '',
        first_relaunch: this.applicationForm.get('first_relaunch')?.value || null,
        second_relaunch: this.applicationForm.get('second_relaunch')?.value || null,
        interview_date: this.applicationForm.get('interview_date')?.value || null,
        final_response: finalResponse,
        final_response_date: this.applicationForm.get('final_response_date')?.value || null,
        userId: this.application.userId
      };

      this.applicationsService.updateApplication(application.id, application).subscribe({

        next: (response) => {
          this.message3 = response;
          this.router.navigate([`/candidatures/${this.application.userId}`]);
        },
        error: (error) => {
          if (error.status === 409) {
            this.message4 = error.error;
          } else {
            this.message4 = "Une erreur s'est produite lors de la mise à jour de la candidature.";
          }
        }

      });


    } else {

      this.message2 = "Le formulaire n'est pas valide.";

    }

  };

}


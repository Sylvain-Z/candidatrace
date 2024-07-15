import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '../../../services/applications/applications.service';
import { Application } from '../../../services/applications/applications.model';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <section class="application-section">
    <h2>Mes candidatures</h2>

    <button class="new-application">Candidature +</button>

    <div *ngIf="userApplications.length > 0; else noApplications">
      <div *ngFor="let application of userApplications"
            class="application"
            [ngClass]="{
              'wait': application.final_response === 0,
              'yes': application.final_response === 1,
              'no': application.final_response === 2
            }">
        <p class="application_link"><a href="{{ application.application_link }}">Voir l'offre</a></p>
        <p class="company_name">{{ application.company_name }}</p>
        <p>{{ application.application_date | date: 'dd/MM/yyyy' }}</p>

        
        <p (click)="toggleDetails(application.id)" class="chevron">
          <i [class]="isDetailsOpen(application.id) ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
        </p>

        <div *ngIf="isDetailsOpen(application.id)">
          <p><a [routerLink]="'/candidatures/' + userIdNav + '/' + application.id"><i class="fa-solid fa-pencil"></i></a></p>
          <p>Website : <a href="{{ application.website }}">{{ application.website }}</a></p>
          <p>Commentaire : {{ application.note }}</p>
          <p>Relancé le : {{ application.first_relaunch | date: 'dd/MM/yyyy' }}</p>
          <p>Seconde relance : {{ application.second_relaunch | date: 'dd/MM/yyyy' }}</p>
          <p>Date entretien : {{ application.interview_date | date: 'dd/MM/yyyy' }}</p>
          <p>Réponse finale le : {{ application.final_response_date | date: 'dd/MM/yyyy' }}</p>
        </div>
      </div>
    </div>


    <ng-template #noApplications>
      <p>{{ message }}</p>
    </ng-template>

  </section>
`,
})
export default class ApplicationsComponent implements OnInit {

  message: string = "";
  userApplications: Application[] = [];
  openDetails: Set<number> = new Set(); // Utilisé pour suivre les ID des candidatures dont les détails sont ouverts
  userIdNav?: number;

  constructor(private route: ActivatedRoute, private applicationsService: ApplicationsService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.userIdNav = userId;

      this.applicationsService.getApplicationsByUserId(userId).subscribe((applications: Application[]) => {
        if (applications && applications.length > 0) {
          this.userApplications = applications;
          console.log("applications component ---> applications by userid", applications)
        } else {
          this.message = 'Candidatures non trouvées';
        }
      });
    });
  }

    // Méthode pour basculer l'ouverture des détails d'une candidature
    toggleDetails(applicationId: number): void {
      if (this.openDetails.has(applicationId)) {
        this.openDetails.delete(applicationId);  // Ferme les détails si déjà ouverts
      } else {
        this.openDetails.add(applicationId);  // Ouvre les détails si fermés
      }
    }
  
    // Méthode pour vérifier si les détails d'une candidature sont ouverts
    isDetailsOpen(applicationId: number): boolean {
      return this.openDetails.has(applicationId);
    }
  
}

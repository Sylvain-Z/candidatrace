import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
  <section class="dashboard-section">
    <h2>Mon tableau de bord</h2>

    <p class="dashboard-p">Nombre de candidatures : </p>
    <p class="dashboard-p">Nombre de réponses : </p>
    <p class="dashboard-p">Nombre de refus : </p>
    <p class="dashboard-p">Nombre d'entretien prévus : </p>
    <p class="dashboard-p">Nombre d'entretien effectués : </p>
    <p class="dashboard-p">Je suis engagé : true or false</p>

  </section>
`,
})

export default class DashboardComponent {

}

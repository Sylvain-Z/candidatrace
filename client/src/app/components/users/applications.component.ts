import { Component } from '@angular/core';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [],
  template: `
  <section class="dashboard-section">
    <h2>Mes candidatures</h2>

    <button>Candidature +</button>
  </section>
`,
})
export default class ApplicationsComponent {

}

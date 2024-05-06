import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="home">
      <h2>CandidaTrace</h2>
      <a routerLink="/connexion">Se connecter</a>
    </section>
  `,
  styles: ``
})
export default class HomeComponent {

}

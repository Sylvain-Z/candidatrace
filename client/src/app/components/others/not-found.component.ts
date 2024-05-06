import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section>
      <h2>La page que vous cherchez n'existe pas</h2>
      <p class="link-home"><a routerLink="/">Accueil</a></p>
    </section>
  `,
  styles: ``
})
export default class NotFoundComponent {

}

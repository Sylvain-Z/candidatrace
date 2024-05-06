import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header&footer/header.component';
import { FooterComponent } from './components/header&footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  template: `
  
    <app-header/>

      <router-outlet><router-outlet/> <!-- affiche les composants paramétrés dans services/app.routes.ts -->

    <app-footer/>
  `,
})
export class AppComponent {

}

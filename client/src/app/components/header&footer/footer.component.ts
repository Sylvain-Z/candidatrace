import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer *ngIf="!isHomePage()">
      <p class="credit">CandidaTrace 2024</p>
    </footer>
  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(private router: Router) { }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

}

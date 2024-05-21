import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { Users } from '../../services/users/users.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="home">
      <h2>CandidaTrace</h2>
      <a routerLink="/connexion">Commencer</a>
    </section>
  `,
  styles: ``
})
export default class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UsersService, private router: Router) { }

  myUserEmail: string | null = localStorage.getItem('loggedInUser');
  user!: Users;

  ngOnInit(): void {

    if (this.myUserEmail === null) {
      return;
    } else {

      this.userService.getUserByEmail(this.myUserEmail).subscribe(user => {
        if (user) {
          this.router.navigate([`/tableau-de-bord/${user.id}`]);
        } else {
          return
        }
      });

    }

  }

}

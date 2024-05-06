import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from './users.model';
import { Observable, map } from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient, private router: Router) { }

/*   APITEST = "http://localhost:9000/api/v1/users"; // test avec API OZES en NODE JS
  getUsers(): Observable<Users[]> {
    return this.http.get<{ user: Users[] }>(`${this.APITEST}/all`).pipe(
      map(response => response.user) // Mappez la propriété 'user' de la réponse sinon les données ne peuvent pas être injecter
    );
  }
  getUserByPseudo(pseudo: string) {
    return this.http.get<Users[]>(`${this.APITEST}/${pseudo}`).pipe(
      map(users => users.find(user => {
        // return user
        return user.pseudo === pseudo // les deux fonctionnent
      }))
    );
  }; */

  isLoggedIn = () => {
    if (localStorage.getItem('loggedInUser')){
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  };


  API = "http://localhost:9000/api/v1/users"; // nouvel API JAVA

  getUsers(): Observable<Users[]> {
    return this.http.get<{ user: Users[] }>(`${this.API}/all`).pipe(
      map(response => response.user) // Mappez la propriété 'user' de la réponse sinon les données ne peuvent pas être injecter
    );
  }
  getUserById(pseudo: string) {
    return this.http.get<Users[]>(`${this.API}/${pseudo}`).pipe(
      map(users => users.find(user => {
        return user
        // return user.pseudo === pseudo // les deux fonctionnent
      }))
    );
  };

  addUser(user: Users) {
    return this.http.post<Users>(`${this.API}`, user);
  }

  updateUser(userId: number, user: Users) {
    return this.http.put<Users>(`${this.API}/${userId}`, user);
  }

  deleteUser(userId: number) {
    return this.http.delete<Users>(`${this.API}/${userId}`);
  }
  
}

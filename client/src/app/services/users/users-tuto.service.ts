import { HttpClient } from '@angular/common/http';
import { Injectable/* , inject */ } from '@angular/core';
import { map } from 'rxjs/operators';
import { Users } from './users-tuto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API = "http://localhost:3000/users";

  // private http = inject(HttpClient); 
  constructor(private http: HttpClient) { }
  // les deux lignes si avant sont équivalentes
  // les deux méthodes fournissent une instance de dépendance,
  // la méthode à privilégier dépend du contexte dans lequel vous travaillez.
  // Dans les classes Angular, l'injection via le constructeur est préférable,
  // tandis que inject() est utilisé dans d'autres contextes où
  // l'injection via le constructeur n'est pas possible.

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.API}`);
  }

  /* getUserById(userId: number): Observable<Users> {
    return this.http.get<Users>(`${this.API}/${userId}`);
  } */

  getUserById(userId: number) {
    return this.http.get<Users[]>(`${this.API}`).pipe(
      map(users => users.find(user => {

        user.id = +user.id; // converti user.id en number car ici on récupère une string bizarement

        // console.log("getUserById user.id", user.id);
        // console.log("getUserById userId", userId);
        // console.log("user.id == userId   ---", user.id == userId);
        // console.log("user.id === userId  +++", user.id === userId);

        return user.id === userId

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

import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn = () => {
    if (localStorage.getItem('loggedInUser')){
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  };

  API = "http://localhost:8080/api/users";

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.API}/all`);
  }

  getUserById(userId: number) {
    return this.http.get<Users>(`${this.API}/id/${userId}`)
  };

  getUserByEmail(userEmail: string) {
    return this.http.get<Users>(`${this.API}/email/${userEmail}`)
  };

  createUser(user: Users): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.API}/create`, user, { headers, observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<any>) => response.body as string),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
      );
  }

  updateUser(userId: number, user: Users) {
    return this.http.put<Users>(`${this.API}/update_infos/${userId}`, user);
  }

  deleteUser(userId: number) {
    return this.http.delete<Users>(`${this.API}/${userId}`);
  }
  
}

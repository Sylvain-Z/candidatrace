import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Application } from './applications.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private http: HttpClient) { }

  API = "http://localhost:8080/api/applications";

  getApplicationsByUserId(userId: number) {
    return this.http.get<Application[]>(`${this.API}/user/${userId}`)
  };
  
  getApplicationsByUserIdAndId(userId: number, id: number) {
    return this.http.get<Application>(`${this.API}/user/${userId}/application/${id}`)
  };

  
  updateApplication(id: number, application: Application): Observable<string> {
    return this.http.put(`${this.API}/update_application/${id}`, application, { observe: 'response', responseType: 'text' })
    .pipe(
      map((response: HttpResponse<any>) => response.body as string),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
    );
  };
}

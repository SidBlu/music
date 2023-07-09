import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseUrl = 'api/users';
  datiUtente = new ReplaySubject();
  datiNewUtente = new ReplaySubject();
  ruoloUtente = new ReplaySubject();

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/signup`, user);
  }

  getUser(email: string): Observable<any> {
    const dati = {email: email};
    return this.http.post<any>(`${this.apiBaseUrl}/user`, dati);
  }
}

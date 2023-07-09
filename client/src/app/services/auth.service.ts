import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBaseUrl = 'api/users';

  constructor(private http: HttpClient, private userService: UserService) { }

  login(email: string, password: string): Observable<any> {
    const user = {email: email, password: password}
    return this.http.post<any>(`${this.apiBaseUrl}/login`, user);
  }

  saveStorage(dati: any) {
    const user = {
      username: dati.username,
      email: dati.email,
      password: dati.password
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  isLogged(): boolean {
    return JSON.parse(localStorage.getItem('user')) !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}

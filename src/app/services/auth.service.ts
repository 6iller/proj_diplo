import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/api/auth';

interface AuthResponse {
  token: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  token = localStorage.getItem('token') || '';
  private _username = localStorage.getItem('username') || '';

  constructor(private http: HttpClient) {}

  register(u: { username: string; password: string }) {
    return this.http.post(`${API_URL}/register`, u, { responseType: 'text' });
  }

  login(u: { username: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${API_URL}/login`, u)
      .pipe(
        tap((res) => {
          this.token = res.token;
          this._username = res.username;
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
        })
      );
  }

  logout() {
    this.token = '';
    this._username = '';
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }


  isLogged(): boolean {
    return !!this.token;
  }

    get currentUser(): string {
    return this._username;
  }
}

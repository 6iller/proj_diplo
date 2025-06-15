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
          localStorage.setItem('token', res.token);
        })
      );
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
  }

  isLogged(): boolean {
    return !!this.token;
  }
}

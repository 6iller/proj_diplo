import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LogsService {
  private API = 'http://localhost:3000/api/logs';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.auth.token}`
    };
  }

  getAuthLog(): Observable<string> {
    return this.http.get(`${this.API}/auth`, {
      responseType: 'text',
      headers: this.getAuthHeaders()
    });
  }

  getFileConfirmLog(): Observable<string> {
    return this.http.get(`${this.API}/file-confirm`, {
      responseType: 'text',
      headers: this.getAuthHeaders()
    });
  }
}


// Используем responseType: 'text', чтобы получить логи как plain text, а не JSON

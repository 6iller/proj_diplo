import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  login = '';
  password = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private msg: MessageService
  ) {}

  onAuth(): void {
    this.auth.login({ username: this.login, password: this.password }).subscribe({
      next: () => this.router.navigate(['cards']),
      error: () =>
        this.msg.add({ severity: 'error', detail: 'Неверный логин/пароль' })
    });
  }
}

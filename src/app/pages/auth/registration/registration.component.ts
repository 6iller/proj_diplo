import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, NgClass, InputTextModule, ButtonModule, CheckboxModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  @Output() registered = new EventEmitter<void>();
  login = '';
  password = '';
  repeatPassword = '';
  email = '';
  isRemember = false;

  constructor(private auth: AuthService, private msg: MessageService) {}

  onAuth(): void {
    if (this.password !== this.repeatPassword) {
      this.msg.add({ severity: 'error', detail: 'Пароли не совпадают' });
      return;
    }
    this.auth
      .register({ username: this.login, password: this.password })
      .subscribe({
        next: () => {
          this.msg.add({ severity: 'success', summary: 'Успех', detail: 'Регистрация прошла успешно' });
          this.registered.emit(); // сообщаем родителю
        },
        error: () => this.msg.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка регистрации' })
      });
  }
}

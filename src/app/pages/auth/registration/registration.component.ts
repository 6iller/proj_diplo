import { Component } from '@angular/core';
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
  providers: [MessageService],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
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
        next: () => this.msg.add({ severity: 'success', detail: 'Успешно!' }),
        error: () =>
          this.msg.add({ severity: 'error', detail: 'Ошибка регистрации' })
      });
  }
}

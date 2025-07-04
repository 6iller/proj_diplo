import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Sidebar } from 'primeng/sidebar';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Sidebar,
    InputText,
    Textarea,
    Button,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  showFeedbackSidebar = false;
  feedback = {
    name: '',
    message: ''
  };


  isAdmin: boolean = false; 

  constructor(private http: HttpClient) {}

sendFeedback() {
  this.http.post('http://localhost:3000/api/feedback', this.feedback).subscribe({
    next: () => {
      console.log('Отправлено');
      this.showFeedbackSidebar = false;
      this.feedback = { name: '', message: '' };
    },
    error: (err) => {
      console.error('Ошибка:', err);
    }
  });
}
}

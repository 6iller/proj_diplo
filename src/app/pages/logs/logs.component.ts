import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LogsService } from '../../services/logs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './logs.component.html'
})
export class LogsComponent {
 selectedLog: 'auth' | 'file' = 'auth';
  dateFilter: string = '';
  logText: string = '';

 constructor(private logs: LogsService, private router: Router) {}

  loadLog(): void {
    const obs = this.selectedLog === 'auth'
      ? this.logs.getAuthLog()
      : this.logs.getFileConfirmLog();

    obs.subscribe(text => {
      if (this.dateFilter) {
        const lines = text.split('\n').filter(line => line.startsWith(this.dateFilter));
        this.logText = lines.join('\n');
      } else {
        this.logText = text;
      }
    });
  }
    goHome() {
    this.router.navigate(['/cards']);
  }
}
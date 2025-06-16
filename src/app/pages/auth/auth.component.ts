import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { TabsModule, Tabs } from 'primeng/tabs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    AuthorizationComponent,
    RegistrationComponent,
    TabsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewInit {
  // активная вкладка
  activeTab = 0;

  // доступ к компоненту p-tabs
  @ViewChild('tabs') tabs!: Tabs;

  ngAfterViewInit() {
    // Устанавливаем значение после инициализации контроллера
    this.tabs.value.set(0);
  }

  switchToAuth() {
    this.activeTab = 0;
    this.tabs.value.set(0);
  }
}
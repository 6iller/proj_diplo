import { Routes } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from '../guards/auth.guard';
import { LogsComponent } from './pages/logs/logs.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'cards',
    component: CardsComponent,
    canActivate: [AuthGuard] // Защищённый доступ
  },
    { 
    path: 'logs', 
    component: LogsComponent, 
    canActivate: [AuthGuard], 
    data: { roles: ['admin'] } 
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' } // Любой неизвестный маршрут ведет на auth
];

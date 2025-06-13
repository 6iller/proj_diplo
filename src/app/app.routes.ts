// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // для [(ngModel)]
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';

export const routes: Routes = [
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  { path: 'cards', component: CardsComponent }, 
  // можно добавить другие страницы
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
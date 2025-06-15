import { Component, OnInit } from '@angular/core';
import { ICard } from '../../models/cards';
import { CardsService } from '../../services/cards.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // для [(ngModel)]
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    InputGroupModule,
    HttpClientModule 
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: ICard[] = [];
  searchTerm: string = '';

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getCards().subscribe((res) => {
      console.log('Загруженные карточки:', res); // ← здесь отладка
      this.cards = res.cards;
    });
  }

  get filteredCards(): ICard[] {
    return this.cardsService.searchCards(this.cards, this.searchTerm);
  }
}

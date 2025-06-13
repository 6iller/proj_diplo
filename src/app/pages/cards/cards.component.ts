import { Component, OnInit } from '@angular/core';
import { ICard } from '../../models/cards';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: ICard[] = [];
  searchTerm: string = '';

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getCards().subscribe((res) => {
      this.cards = res.cards;
    });
  }

  get filteredCards(): ICard[] {
    return this.cardsService.searchCards(this.cards, this.searchTerm);
  }
}

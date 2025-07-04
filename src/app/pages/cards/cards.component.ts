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
import { FilterCardsPipe } from '../../pipes/filter_cards_pipe';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

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
    FilterCardsPipe,
    CheckboxModule,
    DialogModule,
    SidebarModule,
    HttpClientModule 
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  isAdmin = false;
  showAddSidebar = false;
confirmations: Partial<Record<keyof ICard, boolean>> = {
  operationsSheet: false,
  packagingInstruction: false,
  labelTemplate: false
};
  cards: ICard[] = [];
  searchTerm: string = '';
  activeCollection: 'DKS3' | 'CSE' = 'DKS3';
  showFilesDialog = false;
  selectedCard: ICard | null = null;
fileFields: Array<{ key: keyof ICard, label: string }> = [
  { key: 'operationsSheet', label: 'Операционная карта' },
  { key: 'packagingInstruction', label: 'Инструкция по сборке' },
  { key: 'labelTemplate', label: 'Этикетка' }
];
newCard: Partial<ICard> & { imageFile?: File } = {};

  constructor(private cardsService: CardsService, private router: Router) {}

 ngOnInit(): void {
  this.isAdmin = localStorage.getItem('username') === 'admin';
    this.loadCollection();
  }

 switchCollection(name: 'DKS3' | 'CSE'): void {
    if (this.activeCollection !== name) {
      this.activeCollection = name;
      this.searchTerm = '';
      this.cards = [];
      this.loadCollection();
    }
  }

  loadCollection(): void {
    const endpoint = this.activeCollection === 'DKS3' ? 'cards' : 'cards2';
    this.cardsService.getCardsCollection(endpoint).subscribe(res => {
      this.cards = res.cards;
    });
  }

openFilesDialog(card: ICard): void {
  const endpoint = this.activeCollection === 'DKS3' ? 'cards' : 'cards2';
  this.cardsService.getCardByIdCollection(endpoint, card.id).subscribe(full => {
    this.selectedCard = full;
    this.showFilesDialog = true;
  });
}

onFileSelected(event: Event, fieldKey: keyof ICard): void {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length || !this.selectedCard) return;

  const form = new FormData();
  form.append(fieldKey, input.files[0]);

  const endpoint = this.activeCollection === 'DKS3' ? 'cards' : 'cards2';
  this.cardsService.uploadFile(endpoint, this.selectedCard.id, form).subscribe(updated => {
    this.selectedCard![fieldKey] = updated[fieldKey] ?? '';
    const idx = this.cards.findIndex(c => c.id === updated.id);
    if (idx !== -1) this.cards[idx] = updated;
  });
}

  get filteredCards(): ICard[] {
    return this.cardsService.searchCards(this.cards, this.searchTerm);
  }
  
onConfirmFile(fieldKey: keyof ICard) {
  if (this.confirmations[fieldKey] && this.selectedCard) {
    // Логируем только при установке true
    const username = localStorage.getItem('username') || 'guest';
    this.cardsService.logFileConfirmation(username, this.selectedCard.itemCode, fieldKey)
      .subscribe(() => {
        console.log(`Confirmed ${fieldKey} for ${this.selectedCard!.itemCode}`);
      });
  }
}

onCheckboxChange(fieldKey: keyof ICard): void {
  if (this.confirmations[fieldKey] && this.selectedCard) {
    const username = localStorage.getItem('username') || 'guest';
    this.cardsService.logFileConfirmation(username, this.selectedCard.itemCode, fieldKey)
      .subscribe(() => console.log('Logged confirmation', fieldKey));
  }
}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/auth']);
  }
    openLogs(): void {
    this.router.navigate(['/logs']);
  }

  deleteCard(id: string): void {
  if (!confirm('Удалить эту карточку?')) return;

  const endpoint = this.activeCollection === 'DKS3' ? 'cards' : 'cards2';
  this.cardsService.deleteCard(endpoint, id).subscribe(() => {
    this.cards = this.cards.filter(c => c.id !== id);
  });
}
onNewImageSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) this.newCard.imageFile = file;
}

submitNewCard() {
  const endpoint = this.activeCollection === 'DKS3' ? 'cards' : 'cards2';
  const form = new FormData();
  ['itemCode', 'name', 'rawMaterial', 'supplier', 'purpose', 'description']
    .forEach(key => form.append(key, (this.newCard as any)[key] || ''));
  if (this.newCard.imageFile) form.append('image', this.newCard.imageFile);
  
  this.cardsService.createCard(endpoint, form).subscribe(card => {
    this.cards.push(card);
    this.showAddSidebar = false;
    this.newCard = {};
  });
}

}
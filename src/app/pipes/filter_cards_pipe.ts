import { Pipe, PipeTransform } from '@angular/core';
import { ICard } from '../models/cards';

@Pipe({
  name: 'filterCards'
})
export class FilterCardsPipe implements PipeTransform {
  transform(cards: ICard[] | null | undefined, searchTerm: string): ICard[] {
    if (!cards) return [];
    if (!searchTerm?.trim()) return cards;

    const lower = searchTerm.toLowerCase().trim();

    return cards.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      c.itemCode.toLowerCase().includes(lower)
    );
  }
}

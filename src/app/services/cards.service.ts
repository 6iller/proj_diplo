import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../shared/api';
import { Observable, of, BehaviorSubject, catchError, map, tap } from 'rxjs';
import { ICard, ICardServerRes } from '../models/cards';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private showFavoritesOnlySubject = new BehaviorSubject<boolean>(false);
  showFavoritesOnly$ = this.showFavoritesOnlySubject.asObservable();

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  getCards(): Observable<ICardServerRes> {
    this.loaderService.setLoader(true);
    return this.http.get<ICardServerRes>(API.cards).pipe(
      tap(() => this.loaderService.setLoader(false)),
      catchError((error) => {
        this.loaderService.setLoader(false);
        return of({ cards: [] });
      })
    );
  }

  getCardById(id: string): Observable<ICard> {
    return this.http.get<ICard>(`${API.cards}/${id}`);
  }

  deleteCardById(id: string): Observable<ICard> {
    return this.http.delete<ICard>(`${API.cards}/${id}`);
  }

  searchCards(cards: ICard[], value: string): ICard[] {
    return cards.filter(card => card.name.toLowerCase().includes(value.toLowerCase()));
  }

  initShowFavoritesOnly(show: boolean): void {
    this.showFavoritesOnlySubject.next(show);
  }
}

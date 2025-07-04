import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../shared/api';
import { Observable, of, BehaviorSubject, catchError, map, tap } from 'rxjs';
import { ICard, ICardServerRes } from '../models/cards';
import { LoaderService } from '../services/loader.service';

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
getCardsCollection(endpoint: 'cards' | 'cards2'): Observable<{ cards: ICard[] }> {
  const url = endpoint === 'cards' ? API.cards : API.cards2;
  return this.http.get<any>(url).pipe(
    map(res => ({
      cards: res.cards.map((c: any) => ({
        id: c._id,
        itemCode: c.itemCode,
        name: c.name,
        rawMaterial: c.rawMaterial,
        supplier: c.supplier,
        purpose: c.purpose,
        description: c.description,
        image: c.image,
        operationsSheet: c.operationsSheet,
        packagingInstruction: c.packagingInstruction,
        labelTemplate: c.labelTemplate
      }))
    }))
  );
}

getCardByIdCollection(endpoint: 'cards' | 'cards2', id: string): Observable<ICard> {
  const url = endpoint === 'cards' ? API.cards : API.cards2;
  return this.http.get<any>(`${url}/${id}`).pipe(
    map(c => ({
      id: c._id ?? c.id,
      itemCode: c.itemCode,
      name: c.name,
      rawMaterial: c.rawMaterial,
      supplier: c.supplier,
      purpose: c.purpose,
      description: c.description,
      image: c.image,
      operationsSheet: c.operationsSheet,
      packagingInstruction: c.packagingInstruction,
      labelTemplate: c.labelTemplate
    }))
  );
}

getCardByIdFrom(endpoint: 'cards' | 'cards2', id: string): Observable<ICard> {
  const url = endpoint === 'cards' ? `${API.cards}/${id}` : `${API.cards2}/${id}`;
  return this.http.get<any>(url).pipe(
    map(c => ({
      id: c._id,
      itemCode: c.itemCode,
      name: c.name,
      rawMaterial: c.rawMaterial,
      supplier: c.supplier,
      purpose: c.purpose,
      description: c.description,
      image: c.image,
      operationsSheet: c.operationsSheet,
      packagingInstruction: c.packagingInstruction,
      labelTemplate: c.labelTemplate
    }))
  );
}
uploadFile(endpoint: 'cards' | 'cards2', id: string, formData: FormData): Observable<ICard> {
  const url = endpoint === 'cards' ? API.cards : API.cards2;
  return this.http.post<any>(`${url}/${id}/upload`, formData).pipe(
    map(c => ({
      id: c._id ?? c.id,
      itemCode: c.itemCode,
      name: c.name,
      rawMaterial: c.rawMaterial,
      supplier: c.supplier,
      purpose: c.purpose,
      description: c.description,
      image: c.image,
      operationsSheet: c.operationsSheet,
      packagingInstruction: c.packagingInstruction,
      labelTemplate: c.labelTemplate
    }))
  );
}


// адрес поменян!
logFileConfirmation(username: string, itemCode: string, fieldKey: keyof ICard): Observable<void> {
  const payload = { username, itemCode, fieldKey }; 
  // return this.http.post<void>(`${API.cards}/auth/log-confirm`, payload)
  return this.http.post<void>('http://localhost:3000/api/auth/log-confirm', payload);

}

deleteCard(endpoint: 'cards' | 'cards2', id: string): Observable<void> {
  const url = endpoint === 'cards' ? API.cards : API.cards2;
  return this.http.delete<void>(`${url}/${id}`);
}
createCard(endpoint: 'cards' | 'cards2', form: FormData): Observable<ICard> {
  const url = endpoint === 'cards' ? API.cards : API.cards2;
  return this.http.post<any>(url, form).pipe(
    map(c => ({
      id: c._id ?? c.id,
      itemCode: c.itemCode,
      name: c.name,
      rawMaterial: c.rawMaterial,
      supplier: c.supplier,
      purpose: c.purpose,
      description: c.description,
      image: c.image,
      operationsSheet: c.operationsSheet,
      packagingInstruction: c.packagingInstruction,
      labelTemplate: c.labelTemplate
    }))
  );
}
}

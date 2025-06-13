export interface ICard {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ICardServerRes {
  cards: ICard[];
}
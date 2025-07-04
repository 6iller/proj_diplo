export interface ICard {
  id: string;
  itemCode: string;
  name: string;
  rawMaterial: string;
  supplier: string;
  purpose: string;
  description: string;
  image: string;
  operationsSheet?: string; // файл xls
  packagingInstruction?: string; // doc или pdf
  labelTemplate?: string;
}

export interface ICardServerRes {
  cards: ICard[];
}
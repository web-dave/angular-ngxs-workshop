import { ValidationErrors } from '@angular/forms';

export enum NewBookStep {
  info = 'info',
  price = 'price'
}
// dirty flag, status, errors

export interface BookNewInfoStep {
  model: {
    title: string;
    subtitle: string;
    isbn: string;
    cover: string;
    abstract: string;
    numPages: number;
    author: string;
    publisher: string;
  };
  dirty: boolean;
  status: string;
  errors: { [key: string]: ValidationErrors | null };
}

export interface NewBookPriceStep {
  model: {
    price: number;
  };
  dirty: boolean;
  status: string;
  errors: {
    [key: string]: ValidationErrors | null;
  };
}

export interface NewBookStateModel {
  step: NewBookStep;
  info: BookNewInfoStep;
  price: NewBookPriceStep;
}

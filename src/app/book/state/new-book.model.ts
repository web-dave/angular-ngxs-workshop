import { ValidationErrors } from '@angular/forms';

export enum NewBookStep {
  INFO = 'info',
  PRICE = 'price'
}

export interface NewBookInfoStepModel {
  model: {
    title: string;
    subtitle: string;
    isbn: string;
    cover: string;
    abstract: string;
    numPages: number;
    author: string;
  };
  dirty: boolean;
  status: string;
  errors: { [key: string]: ValidationErrors | null };
}
export interface NewBookModel {
  step: NewBookStep;
  info: NewBookInfoStepModel;
  price: {
    model: {
      price: number;
    };
    dirty: boolean;
    status: string;
    errors: { [key: string]: ValidationErrors | null };
  };
}

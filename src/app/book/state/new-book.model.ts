import { ValidationErrors } from '@angular/forms';

export enum NewBookStep {
  info = 'info',
  price = 'price'
}

export interface NewBookInfoStepModel {
  model: {
    isbn: string;
    title: string;
    subtitle: string;
    author: string;
    abstract: string;
    cover: string;
    numPages: number;
  };
  dirty: boolean;
  status: string;
  errors: {
    [key: string]: ValidationErrors | null;
  };
}

export interface NewBookStateModel {
  step: NewBookStep;
  info: NewBookInfoStepModel;
}

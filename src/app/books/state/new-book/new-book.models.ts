export interface NewBookPriceStepModel {
  model: {
    price: number;
  };
  dirty: boolean;
  status: string;
  error: {
    [key: string]: any;
  };
}
export interface NewBookInfoStepModel {
  model: {
    isbn: string;
    title: string;
    subtitle: string;
    cover: string;
    author: string;
    abstract: string;
    numPages: number;
    publisher: string;
  };
  dirty: boolean;
  status: string;
  error: {
    [key: string]: any;
  };
}

export enum NewBookStep {
  info = 'INFO',
  price = 'PRICE',
}
export interface NewBookStateModel {
  step: NewBookStep;
  info: NewBookInfoStepModel;
  price: NewBookPriceStepModel;
}

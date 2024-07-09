export enum NewBookStep {
  info = 'INFO',
  price = 'PRICE'
}
export interface NewBookPriceStepModel {
  model: {
    price: number;
  };
  status: string;
  dirty: boolean;
}

export interface NewBookInfoStepModel {
  model: {
    title: string;
    subtitle: string;
    author: string;
    abstract: string;
    isbn: string;
    cover: string;
    numPages: number;
  };
  status: string;
  dirty: boolean;
}

export interface NewBookStateModel {
  step: NewBookStep;
  info: NewBookInfoStepModel;
  price: NewBookPriceStepModel
}

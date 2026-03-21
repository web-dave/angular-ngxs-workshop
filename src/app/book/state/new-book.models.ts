export enum NewBookStep {
  info = 'INFO',
  price = 'PRICE'
}

export interface NewBookStateModel {
  step: NewBookStep;
}

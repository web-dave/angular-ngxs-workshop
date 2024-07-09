import { Book } from '../models';
import { NewBookStep } from './new-book.model';

export class NewBookAdd {
  static readonly type = '[New Book] Add';
  constructor(public book: Book) {}
}
export class NewBookSelectStep {
  static readonly type = '[New Book] select step';
  constructor(public step: NewBookStep) {}
}
export class NewBookSubmitStep {
  static readonly type = '[New Book] Submit step';
  constructor(public step: NewBookStep) {}
}

export class NewBookSetPages {
  static readonly type = '[New Book] Set Pages';
  constructor(public pages: number) {}
}

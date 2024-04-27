import { Book } from '../models';
import { NewBookStep } from './new-book.model';

export class NewBookSelectStep {
  static type = '[New Book] Select Step';
  constructor(public step: NewBookStep) {}
}

export class NewBookSubmitStep {
  static type = '[New Book] Submit Step';
  constructor(readonly step: NewBookStep) {}
}

export class AddBook {
  static type = '[New Book] Add Book';
  constructor(public book: Book) {}
}

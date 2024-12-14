import { Book } from '../models';
import { NewBookStep } from './new-book.model';

export class NewBookSelectStep {
  static readonly type = '[BOOK] [NEW] Select Step';
  constructor(public step: NewBookStep) {}
}

export class NewBookSubmitStep {
  static readonly type = '[BOOK] [NEW] Submit Step';
  constructor(public step: NewBookStep) {}
}

export class NewBookCreated {
  static type = '[New Book] Created';
  constructor(readonly book: Book) {}
}

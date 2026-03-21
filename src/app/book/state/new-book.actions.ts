import { Book } from '../models';
import { NewBookStep } from './new-book.models';

export class NewBookSelectStep {
  static readonly type = '[Book New] Select Step';
  constructor(readonly step: NewBookStep) {}
}

export class NewBookSubmitStep {
  static type = '[Book New] Submit Step';
  constructor(readonly step: NewBookStep) {}
}
export class NewBookCreated {
  static type = '[Book New] Created';
  constructor(readonly book: Book) {}
}

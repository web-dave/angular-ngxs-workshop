import { Book } from '../../models/book';
import { NewBookStep } from './new-book.models';

export namespace NewBookActions {
  const feature = '[NEW BOOK]';

  export class SetStep {
    static type = feature + ' select Step';
    constructor(public step: NewBookStep) {}
  }

  export class SubmitStep {
    static type = feature + ' submit step';
    constructor(public step: NewBookStep) {}
  }

  export class Created {
    static type = feature + ' Book created';
    constructor(public book: Book) {}
  }
}

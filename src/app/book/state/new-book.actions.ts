import { NewBookStep } from './new-book.model';

export class NewBookSelectStep {
  static readonly type = '[New Book] select step';
  constructor(public step: NewBookStep) {}
}

import { NewBookStep } from './new-book.model';

export class NewBookSelectStep {
  static type = '[Book New] Select Step';
  constructor(public step: NewBookStep) {}
}

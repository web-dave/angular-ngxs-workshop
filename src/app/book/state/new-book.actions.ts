import { NewBookStep } from './new-book.models';

export class NewBookSelectStep {
  static readonly type = '[Book New] Select Step';
  constructor(readonly step: NewBookStep) {}
}

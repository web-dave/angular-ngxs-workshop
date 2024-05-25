import { ValidationErrors } from '@angular/forms';
import { Book } from '../models';

export interface BookCollectionStateModel {
  entities: Book[];
}

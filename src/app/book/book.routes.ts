import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookNewComponent } from './book-new/book-new.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { provideState } from '@ngrx/store';
import { bookFeatureName, booksReducerMap } from './store/book.feature';
import { provideEffects } from '@ngrx/effects';
import { BookCollectionEffects } from './store/book-collection.effects';

export const bookRoutes: Routes = [
  {
    path: '',
    providers: [provideState(bookFeatureName, booksReducerMap), provideEffects(BookCollectionEffects)],
    component: BookComponent,
    children: [
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'new',
        component: BookNewComponent
      },
      {
        path: ':isbn',
        component: BookDetailComponent
      },
      {
        path: ':isbn/edit',
        component: BookEditComponent
      }
    ]
  }
];

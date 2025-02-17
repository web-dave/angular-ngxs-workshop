import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookNewComponent } from './book-new/book-new.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { provideState } from '@ngrx/store';
import { bookCollectionReducer } from './store/book-collection.reducer';
import { bookFeatureName } from './store/book-collection.slice';

export const bookRoutes: Routes = [
  {
    path: '',
    providers: [provideState(bookFeatureName, { bookCollection: bookCollectionReducer })],
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

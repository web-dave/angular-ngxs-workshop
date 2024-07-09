import { Routes, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookNewComponent } from './book-new/book-new.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { Store, provideStore } from '@ngxs/store';
import { BookCollectionState } from './state/book-collection.state';
import { NewBookState } from './state/new-book.state';
import { inject } from '@angular/core';
import { filter } from 'rxjs';
import { Book } from './models';

const getBook: ResolveFn<Book> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store)
  return store.select(BookCollectionState.entity(route.params['isbn'])).pipe(filter((book): book is Book => !!book))
}



export const bookRoutes: Routes = [
  {
    path: '',
    component: BookComponent,
    providers: [provideStore([BookCollectionState, NewBookState])],
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
        component: BookDetailComponent,
        resolve: [()=>({name:'Paul'}), getBook],

      },
      {
        path: ':isbn/edit',
        component: BookEditComponent
      }
    ]
  }
];

import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';

import { BookCollectionSlice } from '../store/book-collection.slice';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [NgFor, BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  store = inject(
    Store<{
      books: { bookCollection: BookCollectionSlice };
    }>
  );
  protected books$: Observable<ReadonlyArray<Book>> = this.store.select(state => state.books.bookCollection.entities);
}

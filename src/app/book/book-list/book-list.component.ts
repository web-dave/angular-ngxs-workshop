import { Component, inject } from '@angular/core';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { Store } from '@ngxs/store';
import { BookCollectionState } from '../state/book-collection.state';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [NgFor, BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  // @Select(BookCollectionState.entities)
  // protected books$!: Observable<Book[]>;

  books$ = inject(Store).select(BookCollectionState.entities);
  foo!: Book[];
}

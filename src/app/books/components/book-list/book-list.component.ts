import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { BooksState } from '../../state/books.state';
import { Book } from '../../models/book';

@Component({
  selector: 'ws-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  @Select(BooksState.entities)
  books$!: Observable<Book[]>;
}

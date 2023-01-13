import { APP_ID, Component, OnInit } from '@angular/core';
import { BooksState } from '../../state/books.state';
import { Select } from '@ngxs/store';
import { Book } from '../../models/book';
import { EMPTY, NEVER, Observable } from 'rxjs';

@Component({
  selector: 'ws-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  @Select(BooksState.entities)
  books$!: Observable<Book[]>;
  // boo$: Observable<any> = NEVER;

  constructor() {}

  ngOnInit(): void {
    // this.boo$ = api.get();
  }
}

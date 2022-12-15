import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Book } from '../../models/book';
import { BookState } from '../../state/book.state';

@Component({
  selector: 'ws-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book$: Observable<Book> = this.route.params.pipe(
    switchMap((params: Params) =>
      this.store.select(BookState.entity(params.isbn))
    ),
    filter((data): data is Book => !!data)
  );

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {}
}

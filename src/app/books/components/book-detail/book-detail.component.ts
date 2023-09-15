import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EMPTY, Observable } from 'rxjs';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { BooksState } from '../../state/books.state';

@Component({
  selector: 'ws-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book$: Observable<Book> = this.route.params.pipe(
    switchMap((params) => this.store.select(BooksState.entity(params.isbn))),
    filter((data) => data != undefined),
    map((book) => book as Book)
  );

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EMPTY, Observable, of } from 'rxjs';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { BooksState } from '../../state/book.state';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ws-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book$: Observable<Book>;

  // foo$ = of(1).pipe(map(() => of(2)));

  constructor(private route: ActivatedRoute, private store: Store) {
    this.book$ = this.route.params.pipe(
      switchMap((params) => this.store.select(BooksState.entity(params.isbn))),
      filter((bookOrUndefined): bookOrUndefined is Book => !!bookOrUndefined)
    );
  }

  ngOnInit(): void {}
}

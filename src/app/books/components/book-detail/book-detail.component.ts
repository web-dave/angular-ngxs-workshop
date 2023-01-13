import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Book } from '../../models/book';
import { Store } from '@ngxs/store';
import { BooksState } from '../../state/books.state';

@Component({
  selector: 'ws-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book$: Observable<Book | undefined> = this.route.params.pipe(
    switchMap((params) =>
      this.store.select(BooksState.selectOneBook(params.isbn))
    )
  );

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {}
}

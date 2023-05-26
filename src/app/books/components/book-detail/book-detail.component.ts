import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Book } from '../../models/book';
import { BookState } from '../../state/book.state';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ws-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent {
  book$ = this.route.params.pipe(
    switchMap((params) => this.store.select(BookState.entity(params['isbn'])))
  );

  constructor(private store: Store, private route: ActivatedRoute) {}
}

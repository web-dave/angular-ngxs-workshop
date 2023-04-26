import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BookActions } from './state/book.state';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new BookActions.LoadAll());
  }
}

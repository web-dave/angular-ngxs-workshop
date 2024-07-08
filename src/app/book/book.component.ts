import { Component, Injectable, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { BookLoadAll } from './state/book-collection.actions';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class BookComponent implements OnInit {
  store = inject(Store);
  actions$ = inject(Actions);
  ngOnInit(): void {
    this.store.dispatch(new BookLoadAll());
    this.actions$.pipe(ofActionSuccessful(BookLoadAll)).subscribe(data => console.log(data));
  }
}

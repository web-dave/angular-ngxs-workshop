import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadBooksStart } from './store/book-collection.actions';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class BookComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(loadBooksStart());
  }
}

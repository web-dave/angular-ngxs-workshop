import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { BookLoadAll } from './state/book.actions';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class BookComponent implements OnInit {
  private readonly store = inject(Store);
  ngOnInit(): void {
    this.store.dispatch(new BookLoadAll());
  }
}

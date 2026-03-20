import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { Store } from '@ngxs/store';
import { BookState } from '../state/book.state';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [NgFor, BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  private readonly store = inject(Store);
  protected books$: Observable<Book[]> = this.store.select(BookState.entities);
}

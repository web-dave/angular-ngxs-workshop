import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { AsyncPipe } from '@angular/common';
import { BookCollectionState } from '../state/book-collectioin.state';
import { Select } from '@ngxs/store';
import { SearchComponent } from '../search/search.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [BookCardComponent, SearchComponent]
})
export class BookListComponent {
  filter = '';
  @Select(BookCollectionState.entities)
  protected books$!: Observable<Book[]>;
  books = toSignal(this.books$);
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { AsyncPipe } from '@angular/common';
import { BookCollectionState } from '../state/book-collectioin.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  @Select(BookCollectionState.entities)
  protected books$!: Observable<Book[]>;
}

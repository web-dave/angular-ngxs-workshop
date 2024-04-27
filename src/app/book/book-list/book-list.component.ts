import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { AsyncPipe } from '@angular/common';
import { Select } from '@ngxs/store';
import { BookCollectionState } from '../state/Book-collection.state';
import { BookApiService } from '../book-api.service';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  @Select(BookCollectionState.entities)
  protected booksState$!: Observable<Book[]>;
  books$ =inject(BookApiService).getAll()
}

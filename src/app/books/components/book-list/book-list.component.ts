import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BookState } from '../../state/book.state';

@Component({
  selector: 'ws-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  @Select(BookState.entieties)
  books$!: Observable<Book[]>;
  constructor() {}

  ngOnInit(): void {}
}

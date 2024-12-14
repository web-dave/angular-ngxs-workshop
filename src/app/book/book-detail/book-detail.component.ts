import { Component, DestroyRef, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { AsyncPipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { BookCollectionState } from '../state/book-collection.state';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink,
    AsyncPipe
  ]
})
export class BookDetailComponent {
  protected book$?: Observable<Book>;
  private isbnValue = '';

  private readonly router = inject(Router);
  private readonly bookService = inject(BookApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);

  @Input({ required: true })
  set isbn(isbn: string) {
    this.book$ = this.store.select(BookCollectionState.entity(isbn)).pipe(filter((book): book is Book => !!book));
    this.isbnValue = isbn;
  }

  remove() {
    this.bookService
      .delete(this.isbnValue)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}

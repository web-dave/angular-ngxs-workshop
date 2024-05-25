import { Component, DestroyRef, Input, computed, effect, inject, input, signal } from '@angular/core';
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
import { BookCollectionState } from '../state/book-collectioin.state';
import { OnInit } from '@angular/core';
import { output } from '@angular/core';

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
export class BookDetailComponent implements OnInit {
  protected book$!: Observable<Book>;
  private isbnValue = '';
  private store = inject(Store);

  bar = signal('Baz');
  barfuss = signal('knuff');

  socke = computed(() => {
    const b = this.bar();
    const f = this.barfuss();
    if (this.barfuss()) {
      console.log('Hurz', b, f);
      return 'Hurz';
    }
    return this.barfuss().toUpperCase();
  });

  constructor() {
    this.bar.set('Hallo');
    this.barfuss.set('Tach');
    console.log('Constructor');
  }
  ngOnInit(): void {
    console.log('OnInit');
  }

  eRef = effect(() => {
    this.barfuss();
    console.log('Moin');
  });

  barfuss2 = 'knuff';

  foo() {
    this.barfuss.set('Knorke');
    this.barfuss2 = 'Knorke';
  }

  private readonly router = inject(Router);
  private readonly bookService = inject(BookApiService);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true })
  set isbn_(isbn: string) {
    this.book$ = this.store.select(BookCollectionState.entity(isbn)).pipe(filter((book): book is Book => !!book));
    this.isbnValue = isbn;
  }

  isbn = input<string>('new');
  dfsj = output();

  bRef = effect(() => {
    console.log(this.isbn());
  });

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

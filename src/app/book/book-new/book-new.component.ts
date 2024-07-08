import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { NewBookState } from '../state/new-book.state';
import { NewBookStep } from '../state/new-book.model';
import { NewBookSelectStep } from '../state/new-book.actions';
import { BookNewInfoComponent } from './book-new-info/book-new-info.component';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [MatButtonToggleModule, RouterLink, AsyncPipe, BookNewInfoComponent]
})
export class BookNewComponent {
  store = inject(Store);
  step$ = this.store.select(NewBookState.step);
  NewBookStep = NewBookStep;
  selectStep(nextStep: NewBookStep) {
    this.store.dispatch(new NewBookSelectStep(nextStep));
  }

  // constructor(
  //   private readonly formBuilder: FormBuilder,
  //   private readonly router: Router,
  //   private readonly bookService: BookApiService,
  //   private readonly destroyRef: DestroyRef
  // ) {}

  // create() {
  // const book = { ...bookNa(), ...this.form.getRawValue() };
  // this.bookService
  //   .create(book)
  //   .pipe(
  //     takeUntilDestroyed(this.destroyRef),
  //     tap(() => this.router.navigateByUrl('/'))
  //   )
  //   .subscribe();
  // }
}

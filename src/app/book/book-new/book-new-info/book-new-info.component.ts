import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { NewBookStep } from '../../state/new-book.model';
import { NewBookState } from '../../state/new-book.state';
import { NewBookSubmitStep } from '../../state/new-book.actions';
import { isbnValidator } from './isbn.validator';

@Component({
  selector: 'ws-book-new-info',
  standalone: true,
  imports: [AsyncPipe, NgxsFormPluginModule, MatFormField, MatInput, MatError, MatLabel, ReactiveFormsModule],
  templateUrl: './book-new-info.component.html',
  styleUrl: './book-new-info.component.scss'
})
export class BookNewInfoComponent {
  store = inject(Store);
  formBuilder = inject(NonNullableFormBuilder);
  step$ = this.store.select(NewBookState.step);
  NewBookStep = NewBookStep;
  bookCollection = 'bookCollection';
  newBookFeature = 'newBook';
  path = `${this.bookCollection}.${this.newBookFeature}.info`;

  protected form = this.formBuilder.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)], [isbnValidator()]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });

  submit() {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.info));
  }
}

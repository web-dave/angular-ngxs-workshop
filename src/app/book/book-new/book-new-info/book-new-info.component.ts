import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { NewBookSubmitStep } from '../../state/new-book.actions';
import { NewBookStep } from '../../state/new-book.model';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxsFormDirective, NgxsFormPlugin } from '@ngxs/form-plugin';

@Component({
  selector: 'ws-book-new-info',
  standalone: true,
  imports: [
    MatInput,
    MatError,
    MatButton,
    RouterLink,
    MatLabel,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormField,
    NgxsFormDirective
  ],
  templateUrl: './book-new-info.component.html',
  styleUrl: './book-new-info.component.scss'
})
export class BookNewInfoComponent {
  private store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);

  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });

  submit(): void {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.info));
  }
}

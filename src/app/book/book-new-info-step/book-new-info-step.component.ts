import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { NewBookSubmitStep } from '../state/new-book.actions';
import { NewBookStep } from '../state/new-book.model';
import { NgxsFormDirective } from '@ngxs/form-plugin';

@Component({
  selector: 'ws-book-new-info-step',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatButton,
    RouterLink,
    MatLabel,
    NgxsFormDirective
  ],
  templateUrl: './book-new-info-step.component.html',
  styleUrl: './book-new-info-step.component.scss'
})
export class BookNewInfoStepComponent {
  store = inject(Store);
  protected form = inject(NonNullableFormBuilder).group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });

  submitStep() {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.INFO));
  }
}

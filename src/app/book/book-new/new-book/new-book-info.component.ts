import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { Store } from '@ngxs/store';
import { NewBookSubmitStep } from '../../state/new-book.actions';
import { NewBookStep } from '../../state/new-book.models';
import { NgxsFormDirective } from '@ngxs/form-plugin';

@Component({
  selector: 'ws-book-new-info',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" ngxsForm="bookState.new.info" class="book-new__form">
      <mat-form-field>
        <mat-label>ISBN</mat-label>
        <input matInput formControlName="isbn" placeholder="ISBN" />
        <mat-error *ngIf="form.hasError('minlength', 'isbn')"> ISBN has to be at least 3 characters long. </mat-error>
        <mat-error *ngIf="form.hasError('required', 'isbn')"> ISBN is required </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput formControlName="title" placeholder="Title" />
        <mat-error *ngIf="form.hasError('required', 'title')"> Title is required </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Subtitle</mat-label>
        <input matInput formControlName="subtitle" placeholder="Subtitle" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Author</mat-label>
        <input matInput formControlName="author" placeholder="Author" />
        <mat-error *ngIf="form.hasError('required', 'author')"> Author is required </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Abstract</mat-label>
        <textarea matInput formControlName="abstract" placeholder="Abstract"></textarea>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Number of pages</mat-label>
        <input matInput formControlName="numPages" placeholder="Number of pages" type="number" />
        <mat-error *ngIf="form.hasError('required', 'numPages')"> Number of pages is required </mat-error>
        <mat-error *ngIf="form.hasError('min', 'numPages')"> A minimum of 10 pages is required </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Cover</mat-label>
        <input matInput formControlName="cover" placeholder="Cover URL" />
      </mat-form-field>

      <div class="form-actions">
        <button mat-button routerLink="/" type="button">Cancel</button>
        <button mat-raised-button color="primary" [disabled]="!form.valid" type="submit">Save</button>
      </div>
    </form>
  `,
  styles: `
    .mat-h2 {
      margin-top: 24px;
      margin-left: 24px;
    }

    .book-new__form {
      margin-left: 24px;

      mat-form-field {
        display: block;
      }
    }

    .form-actions {
      margin-top: 1rem;
    }
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatError,
    MatButton,
    RouterLink,
    MatLabel,
    NgxsFormDirective
  ]
})
export class NewBookInfoComponent {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);

  submit() {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.info));
  }

  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });
}

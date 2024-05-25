import { NgIf, JsonPipe, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NgxsFormDirective } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { NewBookSubmitStep } from '../../state/new-book.action';
import { NewBookStep } from '../../state/new-book.model';

@Component({
  selector: 'ws-info',
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
    JsonPipe,
    AsyncPipe,
    MatButtonToggleModule,
    NgxsFormDirective
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  formPath = 'bookCollection.new.info';
  store = inject(Store);
  formBuilder = inject(NonNullableFormBuilder);
  submit() {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.info));
  }

  protected form = this.formBuilder.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });
}

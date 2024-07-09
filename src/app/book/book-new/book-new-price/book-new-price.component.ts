import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { NewBookState } from '../../state/new-book.state';
import { map } from 'rxjs';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NewBookSubmitStep } from '../../state/new-book.actions';
import { NewBookStep } from '../../state/new-book.model';

@Component({
  selector: 'ws-book-new-price',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, MatFormFieldModule, MatInputModule, NgxsFormPluginModule],
  templateUrl: './book-new-price.component.html',
  styleUrl: './book-new-price.component.scss'
})
export class BookNewPriceComponent {
  store = inject(Store)
  formBuilder = inject(NonNullableFormBuilder)

  form$ = this.store.select(NewBookState.info).pipe(map(info =>{
    const minPrice = info.model.numPages >=100? 10:0;
    return this.formBuilder.group({
      price: [minPrice,[Validators.required, Validators.min(minPrice)]]
    })
  }))

  submit(){
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.price));
  }

}

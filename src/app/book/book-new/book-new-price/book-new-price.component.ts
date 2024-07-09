import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { NewBookState } from '../../state/new-book.state';
import { map } from 'rxjs';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NewBookSetPages, NewBookSubmitStep } from '../../state/new-book.actions';
import { NewBookStep } from '../../state/new-book.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ws-book-new-price',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, MatFormFieldModule, MatInputModule, NgxsFormPluginModule],
  templateUrl: './book-new-price.component.html',
  styleUrl: './book-new-price.component.scss'
})
export class BookNewPriceComponent implements OnInit {
  store = inject(Store)
  formBuilder = inject(NonNullableFormBuilder)
  dRef = inject(DestroyRef)
  numPages = 123
  minPrice = 0

  form: FormGroup<{price: FormControl<number>}> = this.formBuilder.group({
    price: [0,[Validators.required]]
  })

  ngOnInit(): void {
    this.store.select(NewBookState.info).pipe(
      map(info =>{
      const minPrice = info.model.numPages >=100? 10:0;
      const minValidator = Validators.min(minPrice);
      const priceCtrl = this.form.get('price') as FormControl<number>;
      priceCtrl.removeValidators(Validators.min(this.minPrice))
      this.minPrice = minPrice
      priceCtrl.addValidators([minValidator]),
      console.log(priceCtrl)
      priceCtrl.updateValueAndValidity()
    }),
    takeUntilDestroyed(this.dRef)
  ).subscribe()
    
  }

  setPages(){
this.numPages = this.numPages === 99? 123: 99

this.store.dispatch(new NewBookSetPages(this.numPages))
  }

  // form$ = this.store.select(NewBookState.info).pipe(map(info =>{
  //   const minPrice = info.model.numPages >=100? 10:0;
  //   return this.formBuilder.group({
  //     price: [minPrice,[Validators.required, Validators.min(minPrice)]]
  //   })
  // }))

  submit(){
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.price));
  }

}

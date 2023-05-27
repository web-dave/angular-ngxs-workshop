import { Component } from '@angular/core';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { BooksActions } from './books/state/book.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-ngxs-workshop';

  constructor(private actions$: Actions, private sb: MatSnackBar) {
    actions$
      .pipe(
        ofActionSuccessful(BooksActions.LoadAll),
        tap((a) => console.log(a)),
        tap(() => this.sb.open('Yeah!', 'go'))
      )
      .subscribe();
  }
}

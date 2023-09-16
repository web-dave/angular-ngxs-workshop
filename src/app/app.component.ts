import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NewBookState } from './books/state/new-book.state';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-ngxs-workshop';
  @Select(NewBookState.infoStatus)
  status$!: Observable<string>;

  constructor() {}
  ngOnInit(): void {
    console.log('APPPPPPP');
  }
}

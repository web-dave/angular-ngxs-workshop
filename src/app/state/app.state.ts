import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
export interface AppStateModel {
  entities: string[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    entities: [
      'Lorem',
      'ipsum',
      'dolor',
      'sit',
      'amet',
      'consectetur,',
      'adipisicing',
      'elit.',
      'Aperiam',
      'harum',
      'eaque',
      'accusamus',
      'rem',
      'dolorem',
      'optio',
      'maxime',
      'iste',
      'eveniet',
      'vero',
      'nobis',
      'ullam,',
      'blanditiis',
      'qui',
      'aliquid',
      'nemo',
      'mollitia',
      'nesciunt',
      'eligendi',
      'quisquam',
      'impedit',
    ],
  },
})
@Injectable()
export class AppState {}

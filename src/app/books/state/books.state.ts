import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { Book } from '../models/book';

export namespace BooksActions {
  export class LoadAll {
    static readonly type = '[BOOKS] Load All';
  }
}

export interface BookStateModel {
  entities: Book[];
}

@State<BookStateModel>({
  name: 'books',
  defaults: {
    entities: [
      {
        id: '1001606140805',
        title: 'Java Web Scraping Handbook',
        subtitle: 'Learn advanced Web Scraping techniques',
        isbn: '1001606140805',
        abstract:
          'Web scraping or crawling is the art of fetching data from a third party website by downloading and parsing the HTML code to extract the data you want. It can be hard. From bad HTML code to heavy Javascript use and anti-bot techniques, it is often tricky. Lots of companies use it to obtain knowledge ...',
        author: 'Kevin Sahin',
        publisher: 'Leanpub',
        price: '$0.00',
        numPages: 115,
        cover: 'http://localhost:4730/covers/1001606140805.png',
      },
      {
        id: '9780071494618',
        title: 'Hacking Exposed Web 2.0',
        subtitle: 'Web 2.0 Security Secrets and Solutions',
        isbn: '9780071494618',
        abstract:
          'Protect your Web 2.0 architecture against the latest wave of cybercrime using expert tactics from Internet security professionals. Hacking Exposed Web 2.0 shows how hackers perform reconnaissance, choose their entry point, and attack Web 2.0 - based services, and reveals detailed countermeasures and...',
        author: 'Rich Cannings, Himanshu Dwivedi, Zane Lackey',
        publisher: 'McGraw-Hill',
        price: '$12.03',
        numPages: 258,
        cover: 'http://localhost:4730/covers/9780071494618.png',
      },
    ],
  },
})
@Injectable()
export class BookState {
  @Action(BooksActions.LoadAll)
  loadAll(ctx: StateContext<BookStateModel>, action: BooksActions.LoadAll) {}
}

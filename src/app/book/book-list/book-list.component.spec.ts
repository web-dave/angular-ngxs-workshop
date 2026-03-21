import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { bookNa } from '../models';
import { BookListComponent } from './book-list.component';
import { provideStore, Store } from '@ngxs/store';

describe('<ws-book-list>', () => {
  let fixture: ComponentFixture<BookListComponent>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj<Store>(['select']);

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideStore([]),
        {
          provide: Store,
          useValue: storeMock
        }
      ],
      imports: [BookListComponent]
    });
  });

  describe('When books provided', () => {
    it('renders a list of books', () => {
      const books = [{ ...bookNa() }, { ...bookNa(), title: 'Das Leben ist schön!' }];
      storeMock.select.and.returnValue(of(books));

      fixture = TestBed.createComponent(BookListComponent);
      fixture.detectChanges();

      const bookCardDebugElements = fixture.debugElement.queryAll(By.css('ws-book-card'));

      expect(bookCardDebugElements).toHaveSize(books.length);

      //   const book_1 = bookCardDebugElements[0].componentInstance.content();
      const book_2 = bookCardDebugElements[1].nativeElement.innerText;

      //   expect(book_1).toEqual(books[0]);
      expect(book_2).toContain('Das Leben ist schön!');
    });
  });
});

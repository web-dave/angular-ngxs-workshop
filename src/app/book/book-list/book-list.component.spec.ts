import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { Store, provideStore } from '@ngxs/store';
import { BookApiService } from '../book-api.service';
import { of } from 'rxjs';
import { Book, bookNa } from '../models';
import { BookLoadAll } from '../state/book-collection.actions';
import { BookCollectionState } from '../state/Book-collection.state';
import { NewBookState } from '../state/new-book.state';
import { provideRouter } from '@angular/router';
import { BookCardComponent } from '../book-card/book-card.component';
import { Component, Input } from '@angular/core';

@Component({
  selector:'ws-book-card',
  standalone:true,
  template:'{{content.title}}'
})
class BookCardMockComponent{
  @Input()content!:Book
}

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
let mockApi = jasmine.createSpyObj<BookApiService>(['getAll']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent],
      providers:[provideStore([BookCollectionState,NewBookState]),
    {
        provide: BookApiService,
        useValue: mockApi
    }]
    })
    .overrideComponent(BookListComponent,{
      remove:{imports:[BookCardComponent]},
      add:{imports:[BookCardMockComponent]}}
    )
    .compileComponents();
mockApi.getAll.and.returnValue(of([bookNa(),bookNa(),bookNa()]))
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show books (service)',()=>{
expect(fixture.nativeElement.querySelectorAll('ws-book-card').length).toBe(3)
  })

  it('should show books (store)',()=>{
    const store = TestBed.inject(Store)
    store.dispatch(new BookLoadAll())
    fixture.detectChanges()
expect(fixture.nativeElement.querySelectorAll('ws-book-card').length).toBe(6)
  })
});

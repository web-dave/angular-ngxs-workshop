import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { Store, provideStore } from '@ngxs/store';
import { BookApiService } from '../book-api.service';
import { of } from 'rxjs';
import { bookNa } from '../models';
import { RouterTestingModule } from '@angular/router/testing';
import { BookLoadAll } from '../state/book-collection.actions';
import { BookCollectionState } from '../state/Book-collection.state';
import { NewBookState } from '../state/new-book.state';


describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
let mockApi = jasmine.createSpyObj<BookApiService>(['getAll']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent, RouterTestingModule],
      providers:[provideStore([BookCollectionState,NewBookState]),
    {
        provide: BookApiService,
        useValue: mockApi
    }]
    }).compileComponents();
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookCardComponent } from './book-card.component';
import { Book, bookNa } from '../models';

describe('<ws-book-card>', () => {
  describe('unit', () => {
    describe('When no content is passed', () => {
      it('defaults to "n/a"', () => {
        expect(new BookCardComponent().content.isbn).toBe('n/a');
      });
    });
  });
  describe('template', () => {
    let component: BookCardComponent;
    let fixture: ComponentFixture<BookCardComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BookCardComponent, RouterTestingModule]
      }).compileComponents();

      fixture = TestBed.createComponent(BookCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    describe('When no content is passed', () => {
      it('defaults to "n/a"', () => {
        expect(fixture.nativeElement.querySelector('mat-card-title').textContent).toBe('n/a');
      });
    });
    describe('When content is passed', () => {
      it('data should be shown', () => {
        const book: Book = {
          ...bookNa(),
          title: 'Horst'
        };

        fixture.componentRef.setInput('content', book);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('mat-card-title').textContent).toBe('Horst');
      });
    });
  });
});

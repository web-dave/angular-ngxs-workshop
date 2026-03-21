import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookCardComponent } from './book-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { bookNa } from '../models';

describe('BookCardComponent', () => {
  it('should show n/a', () => {
    TestBed.runInInjectionContext(() => {
      const card = new BookCardComponent();
      const content = card.content;
      expect(content.title).toBe('n/a');
      expect(content.author).toBe('n/a');
    });
  });
  describe('Template', () => {
    let fixture: ComponentFixture<BookCardComponent>;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BookCardComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [provideRouter([])]
      });
      fixture = TestBed.createComponent(BookCardComponent);
      fixture.detectChanges();
    });

    it('should show Title n/a', () => {
      const template: HTMLElement = fixture.debugElement.nativeElement;
      const title = template.querySelector('mat-card-title') as HTMLElement;
      expect(title.innerText).toContain('n/a');
    });

    it('should show Title Das Leben ist schön!', () => {
      fixture.componentRef.setInput('content', { ...bookNa(), title: 'Das Leben ist schön!' });
      fixture.detectChanges();
      const template: HTMLElement = fixture.debugElement.nativeElement;
      const title = template.querySelector('mat-card-title') as HTMLElement;
      expect(title.innerText).toContain('Das Leben ist schön!');
    });
  });
});

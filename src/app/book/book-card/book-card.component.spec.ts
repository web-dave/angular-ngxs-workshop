import { BookCardComponent } from './book-card.component';
import { TestBed } from '@angular/core/testing';

describe('BookCardComponent', () => {
  it('should show n/a', () => {
    TestBed.runInInjectionContext(() => {
      const card = new BookCardComponent();
      const content = card.content;
      expect(content.title).toBe('n/a');
      expect(content.author).toBe('n/a');
    });
  });
});

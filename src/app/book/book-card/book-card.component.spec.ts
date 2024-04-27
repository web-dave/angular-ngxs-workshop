import { BookCardComponent } from './book-card.component';

describe('<ws-book-card>', () => {
  describe('unit', () => {
    describe('When no content is passed', () => {
      it('defaults to "n/a"', () => {
        expect(new BookCardComponent().content.isbn).toBe('n/a');
      });
    });
  });
});

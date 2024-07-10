describe('As a user I want to check if a book can be created.', () => {
  let randomISBN = 0;
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4730/books', { fixture: 'books' });
    // cy.intercept('POST', 'http://localhost:4730/books', { fixture: 'book' });
    // cy.intercept('DELETE', 'http://localhost:4730/books/**', {
    //   statusCode: 200,
    //   body: ''
    // });
    cy.visit('/');
    cy.get('mat-card').as('books');
  });
  afterEach(() => {
    cy.request('DELETE', 'http://localhost:4730/books/' + randomISBN);
  });

  it('should increase the number of books by 1', () => {
    let countBefore = 0;
    randomISBN = Math.floor(1000000000000 + Math.random() * 900000);
    cy.get('@books')
      .then(books => (countBefore = books.length))
      // navigate to create form

      .then(() => {
        cy.get('[routerlink="books/new"]').click();

        cy.get('[formControlName="isbn"]').type('978-0-20163-361-0').blur();
        cy.wait(1000);
        cy.get('mat-error').should('exist');
        cy.contains('978-0-20163-361-0 wird schon verwendet!');
        cy.get('[formControlName="isbn"]').clear();
        cy.get('[formControlName="isbn"]').type(randomISBN + '');
        cy.get('mat-error').should('not.exist');

        cy.get('[formControlName="numPages').type(107 + '');

        cy.get('[mat-raised-button=""]').should('be.disabled');

        const fileds = ['title', 'subtitle', 'author', 'abstract', 'cover'];
        fileds.forEach(field => {
          cy.get(`[formControlName="${field}"]`).type('test in ' + field);
        });
        cy.get('[mat-raised-button=""]').should('not.be.disabled').click();

        cy.get('[mat-raised-button=""]').should('be.disabled');

        cy.get(`[formControlName="price"]`).type('9').blur();
        cy.get('mat-error').should('exist');
        cy.contains(' Price is too low (10)');
        cy.get(`[formControlName="price"]`).clear().type('13').blur();
        cy.get('mat-error').should('not.exist');
        cy.screenshot('Form OK');
        cy.get('[mat-raised-button=""]').should('not.be.disabled').click({ force: true });
        cy.get('[routerlink="/"]').click();
        cy.get('@books').should('have.length.greaterThan', countBefore);

        // cy.get('<form-control>').type('value')
        // ...
        // submit form
      });
    // navigate to books list
    // assert books length
  });
});

describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('BOOK MONKEY');
    cy.get('mat-card').first().should('contain.text', 'Web');
  });
});

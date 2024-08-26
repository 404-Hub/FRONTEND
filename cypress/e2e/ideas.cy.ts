describe('Ideas specs', () => {
  it('Open Idea', () => {
    cy.visit('http://localhost:3000/');
    cy.intercept('api/v1/apps?*').as('apps');
    cy.get('[data-test="heaedr-tab-findProject"]').click();
    cy.get('[data-test="category-new"]').click();
    cy.wait('@apps');
    cy.intercept('api/v1/apps/*').as('app');
    cy.get('.projectCardCY').first().click();
    cy.wait('@app');
  });
});

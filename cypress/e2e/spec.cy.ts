describe('Auth specs', () => {
  it('Test Login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('superadmin@example.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.intercept('/api/auth/session').as('session');
    cy.wait('@session');
    cy.get('a[href="/my-account"]').should('exist');
  });
});

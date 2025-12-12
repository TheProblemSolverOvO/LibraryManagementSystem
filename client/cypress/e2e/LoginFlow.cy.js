describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Library App E2E Flow', () => {
  it('loads home page, logs in, and sees the authenticated navbar', () => {
    // 1. Go to the site
    cy.visit('http://localhost:3000');

    // 2. Click Login Link
    cy.contains('Login').click();

    // 3. Check we are on login page
    cy.url().should('include', '/login');

    // 4. Type credentials (USE YOUR ACTUAL USER CREDENTIALS HERE)
    cy.get('input[type="email"]').type('jane.doe2@example.com'); 
    cy.get('input[type="password"]').type('password123');

    // 5. Click Sign In
    cy.get('button').contains('Sign In').click();

    // 6. Assert we are back home and see "Welcome"
    cy.contains('Welcome').should('be.visible');
    cy.contains('Logout').should('be.visible');
  });
});
describe('Login Process', () => {
    it('Successfully logs in', () => {
      cy.visit('/login');
      cy.get('input[name=username]').type('testuser');
      cy.get('input[name=password]').type('testpassword{enter}');
  
      cy.url().should('include', '/dashboard');
    });
  });
  
describe('Visual Test - Budget Display', () => {
    it('should display budgets correctly', () => {
      cy.visit('/login');
      cy.get('input[name=username]').type('testuser');
      cy.get('input[name=password]').type('testpassword{enter}');
      cy.url().should('include', '/budgets');
  
      cy.eyesOpen({
        appName: 'BudgetApp',
        testName: 'Budget Display',
        browser: { width: 800, height: 600 }
      });
  
      cy.eyesCheckWindow('Budget Page');
  
      cy.eyesClose();
    });
  });
  
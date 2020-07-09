context('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Accept Cookie + Switch Theme', () => {
    cy.get('.makeStyles-action-5 > .MuiButton-label').click();
    cy.get('.MuiButton-contained:nth-child(2) > .MuiButton-label').click();
  });

  it('Login', () => {
    cy.get('input[name=email]').type('admin@admin.com');
    cy.get('input[name=password]').type('adminPass{enter}');

    cy.url().should('include', '/app/reports/dashboard');
  });
});

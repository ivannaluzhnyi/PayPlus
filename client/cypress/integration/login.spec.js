context('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Cookie Exist', () => {
    cy.get('.cookie-section').should('be.true');
  });

  it('Accept Cookie', () => {
    cy.get('.cookie-btn').click();
    cy.focused().click();
    cy.contains("Je suis d'accord").click();
  });

  it('Search movie success', () => {
    cy.get('input[name=email]').type('admin@admin.com');

    // {enter} causes the form to submit
    cy.get('input[name=password]').type('adminPass{enter}');

    cy.url().should('include', '/app/reports/dashboard');

    // expect(localStorage.getItem('settings')).to.be.not.null();
    // expect(localStorage.getItem('accessToken')).to.be.not.null();
  });
});

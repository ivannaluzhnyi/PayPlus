context('Login', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  //   it('Accept Cookie + Switch Theme', () => {
  //     cy.get('.makeStyles-action-5 > .MuiButton-label').click();
  //     cy.get('.MuiButton-contained:nth-child(2) > .MuiButton-label').click();
  //   });

  it('Register', () => {
    cy.get('input[name=email]').type('ivan.naluzhnyi@gmail.com');
    cy.get('input[name=password]').type('test123');

    cy.get('input[name=first_name]').type('Ivan');
    cy.get('input[name=last_name]').type('Naluzhnyi');

    cy.get('input[name=name]').type('Lygge');

    cy.get('input[name=address]').type('12 rue de lol');
    cy.get('input[name=zip_code]').type('75020');
    cy.get('input[name=city]').type('Paris');
    cy.get('input[name=country]').type('France');

    cy.get('input[name=phone]').type('0777777777');
    cy.get('input[name=country]').type('France');
    cy.get('input[name=policy]').check();

    // cy.url().should('include', '/app/reports/dashboard');
  });
});

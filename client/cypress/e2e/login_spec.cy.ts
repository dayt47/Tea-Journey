describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('Successfully logs in', () => {
    cy.get('input[name="username"]').type('oguz');
    cy.get('input[name="password"]').type('123');
    cy.get('form').submit();
    cy.url().should('include', '/dashboard');
  });

  it('Shows an alert on failed login', () => {
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Username or password wrong');
    });
    cy.get('input[name="username"]').type('wrongUsername');
    cy.get('input[name="password"]').type('wrongPassword');
    cy.get('form').submit();
  });
});

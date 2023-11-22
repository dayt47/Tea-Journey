describe('Registration Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('Navigation to Registration', () => {
    cy.contains('span', 'or register').click(); // selects the span containing 'or register'
    cy.url().should('include', '/register');
  });

  it('Successfully registers a new user with a unique username', () => {
    // generates a random username
    const randomUsername = `user_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    cy.visit('http://localhost:3000/register');
    cy.get('input[name="name"]').type(randomUsername);
    cy.get('input[name="username"]').type(randomUsername);
    cy.get('input[name="password"]').type('newPassword');
    cy.get('form').submit();
    cy.url().should('include', '/dashboard'); //checks if after registration, dashboard is loaded
  });

  it('Shows alert when registering with an existing username', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('input[name="name"]').type('Existing User');
    cy.get('input[name="username"]').type('oguz');
    cy.get('input[name="password"]').type('anyRandomPassword');
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User with this username already exists');
    });
    cy.get('form').submit();
  });
});

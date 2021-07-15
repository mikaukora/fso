/*
 Start backend: PORT=3003 npm run start:test
 Start frontend: npm start
 Run tests interactively: npm run cypress:open
 Run tests automatically: npm run test:e2e
*/

describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Test User',
      username: 'tuser',
      password: 'salainen'
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Login');
    cy.contains('username');
    cy.contains('password');
  });

  it('login fails with wrong password', function() {
    cy.contains('Login').click();
    cy.get('#username').type('tuser');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error').contains('wrong username or password');
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get('.error').should('have.css', 'border-style', 'solid');
  });

  it('login succeeds with correct credentials', function() {
    cy.contains('Login').click();
    cy.get('#username').type('tuser');
    cy.get('#password').type('salainen');
    cy.get('#login-button').click();

    cy.contains('Test User logged in');
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click();
      cy.get('#username').type('tuser');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
    });

    it.only('A blog can be created', function() {
      cy.contains('create new blog').click();
      cy.get('#title').type('a note created by cypress');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('https://foo.bar.com');

      cy.get('#submit-button').click();
      cy.contains('a note created by cypress');
    });

  });

});

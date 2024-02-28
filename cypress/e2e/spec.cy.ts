/// <reference types="cypress" />

describe('Login Form', () => {
  it('should successfully log in and add a post', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('#email').type('admin@example.com');
    cy.get('#password').type('1234');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/');

    cy.contains('Post').click();

    cy.url().should('eq', 'http://localhost:3000/post');

    cy.get('#image').type('https://www.shorturl.at/img/shorturl-icon.png');
    cy.get('#description').type('This is a test post');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/gallery');
  });
});


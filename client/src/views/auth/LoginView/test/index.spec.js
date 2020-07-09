import React from 'react';
import { mount } from 'cypress-react-unit-test';

import LoginView from '../index';

describe('LoginView component', () => {
  it('works', () => {
    mount(<LoginView />);
    // now use standard Cypress commands
    cy.contains('Hello World!').should('be.visible');
  });
});

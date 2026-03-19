import ingredientsFixture from '../fixtures/ingredients.json';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      body: ingredientsFixture
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавлять булку в конструктор', () => {
      cy.get('[data-cy="ingredient-bun"]').first().find('button').click();
      cy.get('[data-cy="constructor-bun-top"]').should(
        'contain',
        'Краторная булка N-200i'
      );
      cy.get('[data-cy="constructor-bun-bottom"]').should(
        'contain',
        'Краторная булка N-200i'
      );
    });

    it('должен добавлять начинку в конструктор', () => {
      cy.get('[data-cy="ingredient-main"]').first().find('button').click();
      cy.get('[data-cy="constructor-ingredients"]').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('должен открываться при клике на ингредиент и показывать его данные', () => {
      cy.get('[data-cy="ingredient-main"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
    });

    it('должен закрываться по клику на крестик', () => {
      cy.get('[data-cy="ingredient-main"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('должен закрываться по клику на оверлей', () => {
      cy.get('[data-cy="ingredient-main"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

      localStorage.setItem('refreshToken', 'test-refresh-token');
      cy.setCookie('accessToken', 'test-access-token');
    });

    afterEach(() => {
      localStorage.removeItem('refreshToken');
      cy.clearCookie('accessToken');
    });

    it('должен создать заказ, показать номер в модальном окне и очистить конструктор', () => {
      cy.get('[data-cy="ingredient-bun"]').first().find('button').click();
      cy.get('[data-cy="ingredient-main"]').first().find('button').click();

      cy.get('[data-cy="order-button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', '12345');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
      cy.get('[data-cy="constructor-ingredients"]').should(
        'contain',
        'Выберите начинку'
      );
    });
  });
});

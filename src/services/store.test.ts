import { rootReducer } from './store';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('orders');

    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: [],
      orderRequest: false,
      orderModalData: null,
      error: null
    });

    expect(state.user).toEqual({
      user: null,
      isAuthChecked: false,
      loading: false,
      error: null
    });
  });
});

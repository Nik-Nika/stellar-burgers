import store, { rootReducer } from './store';
import constructorReducer from './slices/constructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при инициализации', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, initAction),
      ingredients: ingredientsReducer(undefined, initAction),
      feed: feedReducer(undefined, initAction),
      orders: orderReducer(undefined, initAction),
      user: userReducer(undefined, initAction)
    });
  });

  it('должен возвращать то же состояние при неизвестном экшене', () => {
    const prevState = store.getState();
    const state = rootReducer(prevState, { type: 'UNKNOWN_ACTION' });
    expect(state).toBe(prevState);
  });
});

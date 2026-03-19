import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: 'bun-1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
];

const initialState = {
  ingredients: [],
  loading: false,
  error: null
};

describe('ingredientsSlice', () => {
  describe('fetchIngredients async экшены', () => {
    it('должен устанавливать loading в true при pending', () => {
      const state = ingredientsReducer(
        initialState,
        fetchIngredients.pending('', undefined)
      );
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен записывать ингредиенты и устанавливать loading в false при fulfilled', () => {
      const state = ingredientsReducer(
        initialState,
        fetchIngredients.fulfilled(mockIngredients, '', undefined)
      );
      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.error).toBeNull();
    });

    it('должен записывать ошибку и устанавливать loading в false при rejected', () => {
      const state = ingredientsReducer(
        initialState,
        fetchIngredients.rejected(new Error('Fetch failed'), '', undefined)
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Fetch failed');
      expect(state.ingredients).toHaveLength(0);
    });
  });
});

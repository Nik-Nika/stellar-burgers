import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  createOrder
} from './constructorSlice';
import { TIngredient } from '@utils-types';

jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

const mockBun: TIngredient = {
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
};

const mockIngredient: TIngredient = {
  _id: 'main-1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const initialState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  error: null
};

describe('constructorSlice', () => {
  describe('addIngredient', () => {
    it('должен добавлять булку в bun, а не в список ингредиентов', () => {
      const state = constructorReducer(initialState, addIngredient(mockBun));
      expect(state.bun).toEqual({ ...mockBun, id: 'test-uuid' });
      expect(state.ingredients).toHaveLength(0);
    });

    it('должен добавлять начинку в список ингредиентов', () => {
      const state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual({
        ...mockIngredient,
        id: 'test-uuid'
      });
    });
  });

  describe('removeIngredient', () => {
    it('должен удалять ингредиент по id', () => {
      const stateWithIngredient = {
        ...initialState,
        ingredients: [{ ...mockIngredient, id: 'test-uuid' }]
      };
      const state = constructorReducer(
        stateWithIngredient,
        removeIngredient('test-uuid')
      );
      expect(state.ingredients).toHaveLength(0);
    });

    it('не должен удалять другие ингредиенты', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [
          { ...mockIngredient, id: 'id-1' },
          { ...mockIngredient, id: 'id-2' }
        ]
      };
      const state = constructorReducer(
        stateWithIngredients,
        removeIngredient('id-1')
      );
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].id).toBe('id-2');
    });
  });

  describe('moveIngredient', () => {
    it('должен менять порядок ингредиентов местами', () => {
      const ing1 = { ...mockIngredient, id: 'id-1', name: 'Соус' };
      const ing2 = { ...mockIngredient, id: 'id-2', name: 'Котлета' };
      const stateWithIngredients = {
        ...initialState,
        ingredients: [ing1, ing2]
      };
      const state = constructorReducer(
        stateWithIngredients,
        moveIngredient({ from: 0, to: 1 })
      );
      expect(state.ingredients[0].id).toBe('id-2');
      expect(state.ingredients[1].id).toBe('id-1');
    });
  });

  describe('createOrder async экшены', () => {
    it('должен устанавливать orderRequest в true при pending', () => {
      const state = constructorReducer(
        initialState,
        createOrder.pending('', [])
      );
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять данные заказа и очищать конструктор при fulfilled', () => {
      const mockOrder = {
        _id: 'order-id',
        status: 'done',
        name: 'Space Burger',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        number: 12345,
        ingredients: ['bun-1', 'main-1']
      };
      const stateWithData = {
        ...initialState,
        bun: { ...mockBun, id: 'test-uuid' },
        ingredients: [{ ...mockIngredient, id: 'test-uuid-2' }]
      };
      const state = constructorReducer(
        stateWithData,
        createOrder.fulfilled(
          { order: mockOrder, name: 'Space Burger', success: true },
          '',
          []
        )
      );
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });

    it('должен записывать ошибку при rejected', () => {
      const state = constructorReducer(
        initialState,
        createOrder.rejected(new Error('Failed to create order'), '', [])
      );
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('Failed to create order');
    });
  });
});

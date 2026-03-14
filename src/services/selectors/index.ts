import { RootState } from '../store';

// Ingredients selectors
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;

// Constructor selectors
export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;
export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;
export const selectOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;

// User selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

// Feed selectors
export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;
export const selectSelectedOrder = (state: RootState) =>
  state.feed.selectedOrder;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;

// Orders selectors
export const selectUserOrders = (state: RootState) => state.orders.orders;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;

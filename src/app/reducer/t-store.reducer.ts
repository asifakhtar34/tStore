import { Action, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AddToCartSuccess, CartActionTypes, DeleteProductFromCartSuccess, InitializeCartSuccess, RemoveFromCartSuccess } from 'src/app/reducer/t-store.action';

export type TshirtState = {
    products?: Array<any>,
    totalItemCount?: number
};

const initialState: TshirtState = {
    products: [],
    totalItemCount: 0
};

export function tShirtReducer(
  state: TshirtState = initialState,
  action: Action
): TshirtState {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART_SUCCESS:
        console.log('reducer',(action as AddToCartSuccess).response)
      return {
        products: (action as AddToCartSuccess).response?.products,
        totalItemCount: (action as AddToCartSuccess).response?.itemsTotalCount,
      };
    case CartActionTypes.REMOVE_FROM_CART_SUCCESS:
        console.log('reducer',(action as RemoveFromCartSuccess).response)
      return {
        products: (action as RemoveFromCartSuccess).response?.products,
        totalItemCount: (action as RemoveFromCartSuccess).response?.itemsTotalCount,
      };
    case CartActionTypes.INITIALIZE_CART_SUCCESS:
        console.log('reducer',(action as InitializeCartSuccess).response)
      return {
        products: (action as InitializeCartSuccess).response?.products,
        totalItemCount: (action as InitializeCartSuccess).response?.itemsTotalCount,
      };
    case CartActionTypes.DELETE_PRODUCT_FROM_CART_SUCCESS:
        console.log('reducer',(action as DeleteProductFromCartSuccess).response)
      return {
        products: (action as DeleteProductFromCartSuccess).response?.products,
        totalItemCount: (action as DeleteProductFromCartSuccess).response?.itemsTotalCount,
      };
    default:
      return state;
  }
}

export const selectFeature = (state: AppState) => state.tshirt;

export const getProductData = createSelector(
  selectFeature,
  (state: TshirtState) => {
    return state;
  }
);

export const getTotalCartItems = createSelector(
  selectFeature,
  (state: TshirtState) => {
    return state.totalItemCount;
  }
);

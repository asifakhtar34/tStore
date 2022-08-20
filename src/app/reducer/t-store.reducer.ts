import { Action, createSelector } from '@ngrx/store';
import { AddToCartSuccess, CartActionTypes } from 'src/app/reducer/t-store.action';

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
        // ...state,
        // propertyData: (action as FetchPropertyDataSuccess).response,
      };
    default:
      return state;
  }
}

// export const selectFeature = (state: AppState) => state.property;

// export const getPropertyData = createSelector(
//   selectFeature,
//   (state: PropertyState) => {
//     return state.propertyData;
//   }
// );

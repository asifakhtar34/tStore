import { Action } from '@ngrx/store';

export enum CartActionTypes {
  ADD_TO_CART = '[CART] Add To Cart',
  ADD_TO_CART_SUCCESS = '[CART] Add To Cart Success',
  REMOVE_FROM_CART = '[CART] Remove From Cart',
  REMOVE_FROM_CART_SUCCESS = '[CART] Remove From Cart Success',
  CLEAR_CART = '[CART] Clear Cart',
  CLEAR_CART_SUCCESS = '[CART] Clear Cart Success',
}
export class AddToCart implements Action {
  readonly type: string = CartActionTypes.ADD_TO_CART;
  constructor(private product: any) {console.log('action', product)}
}

export class AddToCartSuccess implements Action {
  readonly type: string = CartActionTypes.ADD_TO_CART_SUCCESS;
  constructor(public response: any) {}
}

export class RemoveFromCart implements Action {
  readonly type: string = CartActionTypes.REMOVE_FROM_CART;
  constructor(private product: any) {}
}

export class RemoveFromCartSuccess implements Action {
  readonly type: string = CartActionTypes.REMOVE_FROM_CART_SUCCESS;
  constructor(public response: any[]) {}
}

export class ClearCart implements Action {
  readonly type: string = CartActionTypes.CLEAR_CART;
  constructor() {}
}

export class ClearCartSuccess implements Action {
  readonly type: string = CartActionTypes.CLEAR_CART_SUCCESS;
  constructor(public response: any[]) {}
}


// "@ngrx/effects": "^14.2.0",
//     "@ngrx/store": "^14.2.0",
//     "@ngrx/store-devtools": "^14.2.0",
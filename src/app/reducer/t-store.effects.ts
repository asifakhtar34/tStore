import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Tshirt } from 'src/app/app.interface';
import { AddToCart, AddToCartSuccess, CartActionTypes, DeleteProductFromCartSuccess, InitializeCartSuccess, RemoveFromCartSuccess } from 'src/app/reducer/t-store.action';
import { TStoreService } from 'src/app/services/t-store.service';
import { getItemCount } from 'src/app/util/common.util';

@Injectable()
export class TshirtEffects {
  initializeCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActionTypes.INITIALIZE_CART),
      map((action: any) => {
        console.log( 'effects', action)
       let data=  JSON.parse(localStorage.getItem('data') || JSON.stringify({products : [], itemsTotalCount : 0}))
        return new InitializeCartSuccess(data)
      }),
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActionTypes.DELETE_PRODUCT_FROM_CART),
      map((action: any) => {
        let data=  JSON.parse(localStorage.getItem('data') || JSON.stringify({products : [], itemsTotalCount : 0}))
        console.log(data)
        data = {
          ...data,
          products: data.products
        }
        data = {
          ...data,
          products: [...data.products].filter((item: Tshirt)=> item.id != action.product?.id),
          itemsTotalCount: data.itemsTotalCount - [...data.products].filter((item: Tshirt)=> item.id == action.product?.id)?.[0]?.value
        }
        console.log(data)
        localStorage.setItem('data', JSON.stringify(data))
        return new DeleteProductFromCartSuccess(data)
      }),
    )
  );


  getTshirtList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActionTypes.ADD_TO_CART),
      map((action: any) => {
        console.log( 'effects', action)
       let data=  JSON.parse(localStorage.getItem('data') || JSON.stringify({products : [], itemsTotalCount : 0}))
        console.log(data)
        data = {
          ...data,
          products: data.products
        }
        data = {
          ...data,
          ...(!doesExist(data.products, action.product)? {products: [...data.products,{...action.product, value : action.product?.value + 1}]} : {products: [...data.products].map((item:any)=>{
            if (item.id == action.product?.id){
              if(getItemCount(action.product?.id, data.products) < item.quantity) {
                return {
                  ...item,
                  value: item.value+1
                }
              } else {
                alert('Out Of Stock!! Please Visit Lator')
              }

            }
              return{
                ...item
              }

          })}),
          itemsTotalCount: data.itemsTotalCount+1
        }
        console.log(data)
        localStorage.setItem('data', JSON.stringify(data))
        return new AddToCartSuccess(data)
      }),
    )
  );

  removeItemFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActionTypes.REMOVE_FROM_CART),
      map((action: any) => {
        console.log( 'effects', action)
       let data=  JSON.parse(localStorage.getItem('data') || JSON.stringify({products : [], itemsTotalCount : 0}))
        console.log(data)
        data = {
          ...data,
          products: data.products
        }
        data = {
          ...data,
          ...removeItemFromCart(action.product),
          itemsTotalCount: data.itemsTotalCount-1
        }
        console.log(data)
        localStorage.setItem('data', JSON.stringify(data))
        return new RemoveFromCartSuccess(data)
      }),
    )
  );

constructor(
    private actions$: Actions,
    private api: TStoreService,
  ) {}
}




export function doesExist(productsList: any, currProduct: any) {
return  productsList?.filter((item: any) => item.id == currProduct.id)?.length
}

export function removeItemFromCart(item: Tshirt){
  // debugger
  console.log(item)
  let data=  JSON.parse(localStorage.getItem('data') || JSON.stringify({products : [], itemsTotalCount : 0}))
        console.log(data)
        data = {
          ...data,
          products: data.products
        }
     let itemToBeRemoved =[...data.products].filter((data: any)=> data.id == item.id)?.[0];
     console.log(itemToBeRemoved)
  if(itemToBeRemoved.value!>1){
    return { products: [...data.products].map((data:any)=>{
      if (data.id == item?.id){
        return {
            ...item,
            value: data.value-1
          }

      }
        return data

    })
  }
  } else{
    return {
      products: [...data.products].filter((data:any)=> item.id != data.id)
    }
  }

}
/*

//when an item is added to cart

//check for id exist or not

//if exist add to its quantity

//if not add as new obj

//also add a item total

//when ever add or remove is triggered its inc or dec accordingly

//clear cart will clear all obj in array


*/
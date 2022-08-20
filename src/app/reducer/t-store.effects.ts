import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AddToCart, AddToCartSuccess, CartActionTypes } from 'src/app/reducer/t-store.action';
import { TStoreService } from 'src/app/services/t-store.service';

@Injectable()
export class TshirtEffects {
  // getTshirtList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CartActionTypes.ADD_TO_CART),
  //     map((action: AddToCart) => {
  //       console.log( 'effects', action)
  //       return new AddToCartSuccess(action)
  //     }),
  //     // switchMap((data: any) => {

  // //  return new AddToCartSuccess([])
  //       // return this.api.getPlacesList(data.payload, data.page, data.pagesize ).pipe(
  //       //   map((resp: any) => {
  //       //     if (resp.succeeded) {
  //       //       return new FetchPlacesListSuccess(resp.items || resp.data);
  //       //     }
  //       //     return new FetchPlacesListSuccess([]);
  //       //   }),
  //       //   catchError((err) => of(new OnError(err)))
  //       // );
  //     // })
  //   )
  // );

constructor(
    private actions$: Actions,
    private api: TStoreService,
  ) {}
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
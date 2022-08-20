import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tshirt } from 'src/app/app.interface';
import { AppState } from 'src/app/app.reducer';
import { AddToCart, DeleteProductFromCart, InitializeCart, RemoveFromCart } from 'src/app/reducer/t-store.action';
import { getProductData } from 'src/app/reducer/t-store.reducer';
import { getItemCount } from 'src/app/util/common.util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  tShirtList: any;
  totalItemCount: any;
  getItemCount = getItemCount;

  constructor(private _store: Store<AppState>) {
    this._store.dispatch(new InitializeCart())

   }

  ngOnInit(){
    this._store.select(getProductData).subscribe((data: any)=>{
      this.tShirtList = data?.products;
      this.totalItemCount = data?.totalItemCount;
    })
  }

  addToCart(item: Tshirt){

    // data = {
    //   products: [],
    //   totalItemCount: 0
    // }
    this._store.dispatch(new AddToCart(item))

  }

  removeFromCart(item: Tshirt){
    this._store.dispatch(new RemoveFromCart(item))
  }

  getTotalPrice(){
    let totalPrice: number = 0;
    this.tShirtList.map((item: Tshirt)=>{
      if(item.value!>1){
        totalPrice += item.value! * item.price
      } else {
        totalPrice += item.price
      }
     })
     console.log(totalPrice)
     return totalPrice;
  }

  deleteFromCart(tshirt: Tshirt){
    console.log(tshirt)
    this._store.dispatch(new DeleteProductFromCart(tshirt))
  }

}

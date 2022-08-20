import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tshirt } from 'src/app/app.interface';
import { TStoreService } from 'src/app/services/t-store.service';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AddToCart, InitializeCart, RemoveFromCart } from 'src/app/reducer/t-store.action';
import { getProductData } from 'src/app/reducer/t-store.reducer';
import { getItemCount } from 'src/app/util/common.util';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  tShirts: Array<Tshirt> = []
  filterText: string = '';
  searchTerm$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  filteredtShirts: Tshirt[] = [];
  selectedtShirtList: any;
  getItemCount = getItemCount


  constructor(private tShirtService: TStoreService, private _store: Store<AppState>) {
    this._store.dispatch(new InitializeCart())
    tShirtService.getProductList().subscribe((data:any)=> {
      this.tShirts = data.map((item: Tshirt)=> {
        return {
          ...item,
          value: 0
        }
      });
      this.filteredtShirts = this.tShirts;
    } );

    this.searchTerm$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        // filter((searchStr: string) => searchStr.length >= 3)
      )
      .subscribe((searchStr: string) => {
        console.log(searchStr)
        this.filterText = searchStr;
        this.search();
      });
   }

  ngOnInit(): void {
    this._store.select(getProductData).subscribe((data: any)=>{
      this.selectedtShirtList = data?.products;
    })

  }

  // search(){
  //   console.log(this.filterText)
  // }

  search(){
   this.filteredtShirts = this.tShirts.filter((item: Tshirt)=> this.filterText.toLocaleLowerCase().includes(item.type.toLocaleLowerCase()) || this.filterText.includes(item.color.toLocaleLowerCase()) || item.name.toLocaleLowerCase().includes(this.filterText))

  //  this.filteredtShirts = this.tShirts.filter((item: Tshirt)=> item.name.toLocaleLowerCase().includes(this.filterText))
  }

  filter(event: any){
    console.log(event)
    let filterValues = event;

    this.filteredtShirts = this.tShirts
    .filter((item: Tshirt)=>{
     if(filterValues.colour.length){
      console.log(filterValues.colour.includes(item.color), item.color)
      return filterValues.colour.includes(item.color)
     }
      return item
    } )
    .filter((item: Tshirt)=>{
      if(filterValues.gender.length){
        return filterValues.gender.includes(item.gender)
      }
      return item
    } )
    .filter((item: Tshirt)=>{
      if(filterValues.type.length){
        return filterValues.type.includes(item.type)
      }
      return item
    } )
  }

  addToCart(item: Tshirt){

    // data = {
    //   products: [],
    //   totalItemCount: 0
    // }
    // console.log(getItemCount(item.id, this.tShirts), item.quantity)
    // if(getItemCount(item.id, this.tShirts) < item.quantity){
      this._store.dispatch(new AddToCart(item))
    // }
    // else {
    //   alert('Out Of Stock!! Please Visit Lator')
    // }

  }

  removeFromCart(item: Tshirt){
    this._store.dispatch(new RemoveFromCart(item))
  }


}

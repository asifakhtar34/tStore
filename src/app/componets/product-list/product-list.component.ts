import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tshirt } from 'src/app/app.interface';
import { TStoreService } from 'src/app/services/t-store.service';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AddToCart } from 'src/app/reducer/t-store.action';

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


  constructor(private tShirtService: TStoreService, private _store: Store<AppState>) {
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

  }

  // search(){
  //   console.log(this.filterText)
  // }

  search(){
   this.filteredtShirts = this.tShirts.filter((item: Tshirt)=> this.filterText.includes(item.type.toLocaleLowerCase()) || this.filterText.includes(item.color.toLocaleLowerCase()) || item.name.toLocaleLowerCase().includes(this.filterText))

  //  this.filteredtShirts = this.tShirts.filter((item: Tshirt)=> item.name.toLocaleLowerCase().includes(this.filterText))
  }

  filter(event: any){
    console.log(event)
  }

  addToCart(item: Tshirt){

    // data = {
    //   products: [],
    //   totalItemCount: 0
    // }
    this._store.dispatch(new AddToCart(item))

  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getProductData, getTotalCartItems } from 'src/app/reducer/t-store.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItemCount: any;

  constructor(private _store: Store<AppState>) {
    this._store.select(getTotalCartItems).subscribe((data: any)=>{
      this.totalItemCount = data;
    })
   }

  ngOnInit(): void {
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tshirt } from 'src/app/app.interface';

@Injectable({
  providedIn: 'root'
})
export class TStoreService {

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Tshirt[]>{
    return this.httpClient.get<Tshirt[]>('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
  }
}

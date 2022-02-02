import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Purchase } from '../common/purchase';
import Axios  from 'axios';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private Url = 'http://localhost:3000';
  //private Url = 'api'

  product: Product

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(`/checkout/purchase`, purchase);    
  }
  
  updateProductsStocks(theCartItem: CartItem) {
    const unitsInStock = theCartItem.unitsIntStock - theCartItem.quantity;
    
    this.httpClient.patch(`/products/updateStocks/${theCartItem._id}`, unitsInStock)
  }

  markOutofStocks(theCartItem: CartItem) {

  }
}

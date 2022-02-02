import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from '../common/product'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  url = 'http://localhost:3000'
  //url = 'api'

  constructor(private httpClient: HttpClient) {}

 
  getProduct(productId: String) {
    
    const productUrl = `/products/${productId}`
    
    return this.httpClient.get<Product>(productUrl)
  }

  getProducts(pageNumber: Number, pageSize: Number) {
   return this.httpClient.get<Product[]>(`/products`)
  }
  
  getProductsByKeyword(keyword: string) {
    
    const productUrl = `products/search/${keyword}`
    
    return this.httpClient.get<Product[]>(productUrl)
  }

  getProductsByCategory(category: string) { 
    return this.httpClient.get<Product[]>(`/products`)
  }

  getCategories() {
    return this.httpClient.get<ProductCategory[]>(`/products/getAllCategories`)
  }

}

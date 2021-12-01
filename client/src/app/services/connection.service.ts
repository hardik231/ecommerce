import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from '../common/product'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

   url = 'api'

  constructor(private httpClient: HttpClient) {}

 
  getProduct(productId: String) {
    
    const productUrl = `${this.url}/products/${productId}`
    
    return this.httpClient.get<Product>(productUrl)
  }

  getProducts(pageNumber: Number, pageSize: Number) {
   return this.httpClient.get<Product[]>(`${this.url}/products`)
  }
  
  getProductsByKeyword(keyword: string) {
    
    const productUrl = `${this.url}/products/search/${keyword}`
    
    return this.httpClient.get<Product[]>(productUrl)
  }

  getProductsByCategory(category: string) {
    
    return this.httpClient.get<Product[]>(`${this.url}/products/categories/${category}`)
  }

  getCategories() {
    return this.httpClient.get<ProductCategory[]>(`${this.url}/categories`)
  }

}

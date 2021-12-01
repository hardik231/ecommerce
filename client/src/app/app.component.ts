import { Component, OnInit } from '@angular/core';
import { Product } from './common/product';
import { ConnectionService } from './services/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'client';
  products: Product []

  pageSize = 8
  pageNumber = 1
  
  constructor(private connectionService: ConnectionService) { }
  
  ngOnInit(): void {
    this.listProducts()
  }  

  listProducts() {
    return this.connectionService.getProducts(this.pageNumber, this.pageSize).subscribe(
      data => this.products = data
    )}

}

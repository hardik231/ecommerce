import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import  { NgxPaginationModule} from 'ngx-pagination'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  products: Product[] = [] 
  pageSize = 8
  pageNumber = 1

  constructor(private connectionService: ConnectionService,
              private route: ActivatedRoute,
              private cartService: CartService) { 
                
              }
              
  ngOnInit(): void {
  this.route.paramMap.subscribe( () => {
      this.handleProducts()
  })
  }

  

  handleProducts() {
    const keyword = this.route.snapshot.paramMap.has('keyword')    

    if(keyword) 
      this.listSearchProducts()
    else
      this.listProducts()
  }
  
  listSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get('keyword')
    return this.connectionService.getProductsByKeyword(keyword).subscribe(
      data => this.products = data
    )
  }

  listProducts() {
    const flag : boolean = this.route.snapshot.paramMap.has('categoryId');
    if(flag) {
      const category = this.route.snapshot.paramMap.get('category')
      
      return this.connectionService.getProductsByCategory(category).subscribe(
        data => this.products = data
      )
    }
    else {
      return this.connectionService.getProducts(this.pageNumber, this.pageSize).subscribe(
        data => this.products = data
      )
    }
  }


  addToCart(theProduct: Product) {
    
  
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.price}`);

    // TODO ... do the real work
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);

  }

  outOfStock() {
    
  }

 
}
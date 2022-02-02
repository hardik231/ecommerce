import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product
  url = ''

  constructor(private connectionService: ConnectionService,
              private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService) { 
                this.url = connectionService.url;                     
              }

  ngOnInit(): void { 
      this.showProductsDetail()    
  }

  showProductsDetail() {
    
    const productId = this.route.snapshot.paramMap.get('productId')

    this.connectionService.getProduct(productId).subscribe(
      data => { 
        this.product = data
      }
    )

  }

  addToCart() {
     console.log(`Adding to cart: ${this.product.name}, ${this.product.price}`);
    const theCartItem = new CartItem(this.product);
     this.cartService.addToCart(theCartItem)
}

  incrementQuantity() {
    const tempCartItem = new CartItem(this.product);
    this.cartService.addToCart(tempCartItem);
  }

  decrementQuantity() {
    const tempCartItem = new CartItem(this.product)
    this.cartService.decrementQuantity(tempCartItem);
  }

  checkout() {  
    this.addToCart();
    this.router.navigateByUrl('/checkout');
  }
}

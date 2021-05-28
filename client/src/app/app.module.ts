import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductComponent } from './components/product/product.component';
import { SearchComponent } from './components/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ConnectionService } from './services/connection.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './components/header/header.component';
 
const routes : Routes =  [
  { path:'products', component: ProductComponent },
  { path:'category', component: ProductComponent },
  {path:'search/:keyword', component: ProductComponent},
  { path:'checkout', component: CheckoutComponent },
  {path: 'cart-details', component: CartDetailsComponent},
  { path:'category/:categoryId', component: ProductComponent },
  { path:'products/:productId', component: ProductDetailsComponent },
  { path:'', redirectTo: '/products', pathMatch: 'full'},
  { path:'**', component: NotFoundComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDetailsComponent,
    NotFoundComponent,
    SearchComponent,
    CartDetailsComponent,
    CheckoutComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [ConnectionService],
  bootstrap: [AppComponent]

})
export class AppModule { }

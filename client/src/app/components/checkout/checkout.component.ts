import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { State } from 'src/app/common/state';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { City } from 'src/app/common/city';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  shippingAddressCities: City[] = [];
  billingAddressCities: City[] = [];

  constructor(private formBuilder: FormBuilder,
              private formService: FormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  ngOnInit(): void {
    
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                              [Validators.required, 
                               Validators.minLength(2), 
                               Luv2ShopValidators.notOnlyWhitespace]),

        lastName:  new FormControl('', 
                              [Validators.required, 
                               Validators.minLength(2), 
                               Luv2ShopValidators.notOnlyWhitespace]),
                               
        email: new FormControl('',
                              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        phone: new FormControl('',
                              [Validators.required, Validators.pattern('0-9'), Validators.maxLength(10), Validators.minLength(10)]
                              )                      
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                     Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), 
                                   Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      Luv2ShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                     Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), 
                                   Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      Luv2ShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2), 
                                          Luv2ShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // populate credit card months

    this.getStates('shippingAddress');
    this.getStates('billingAddress');

    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card years

    this.formService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

  }

  reviewCartDetails() {

    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get phone() { return this.checkoutFormGroup.get('customer.phone')}

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }



  copyShippingAddressToBillingAddress(event) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
            .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      // bug fix for states
       this.billingAddressStates = this.shippingAddressStates;
       this.billingAddressCities = this.shippingAddressCities;


    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      // bug fix for states
      this.billingAddressStates = [];
    }
    
  }

  onSubmit() {
    console.log("Handling the submit button");

    // if (this.checkoutFormGroup.invalid) {
    //   this.checkoutFormGroup.markAllAsTouched();
    //   console.log('invalid fields ')
    //   return;
    // }

    // set up order
    let purchase = new Purchase();
    purchase.totalPrice = this.totalPrice;
    purchase.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    // - long way
    /*
    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    */

    // - short way of doing the same thingy
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    const customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.firstName = customer.firstName;
    purchase.lastName = customer.lastName;
    purchase.email = customer.email;
    purchase.phone = customer.phone;
    
    // populate purchase - shipping address
    const shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(shippingAddress.state));
    purchase.shippingAddressState = shippingState.state_name;
    const shippingCity: City = JSON.parse(JSON.stringify(shippingAddress.city))
    purchase.shippingAddressCity = shippingCity.city_name;
    purchase.shippingAddressStreet = shippingAddress.street;
    purchase.shippingAddressZipCode = shippingAddress.zipCode;


    // populate purchase - billing address
    const billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(billingAddress.state));
    purchase.billingAddressState = billingState.state_name;
    const billingCity: City = JSON.parse(JSON.stringify(billingAddress.city));  
    purchase.billingAddressCity = billingCity.city_name;
    purchase.billingAddressStreet = billingAddress.street;
    purchase.billingAddressZipCode = billingAddress.zipCode;
    
    purchase.orderItems = orderItems;

    const payment = this.checkoutFormGroup.controls['creditCard'].value;
    purchase.creditCardType = payment.cardType;
    purchase.creditCardNameOnCard = payment.nameOnCard;
    purchase.creditCardNumber = payment.cardNumber;
    purchase.creditCardSecurityCode = payment.securityCode;
  


    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
        next: response => {
          alert(`Your order has been received.\nOrder tracking number: ${response}`);

          // reset cart
          this.resetCart();


        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );

    
  }

  resetCart() {
    // reset cart data

    this.cartService.cartItems.forEach(element => {
     
      if(element.unitsIntStock - element.quantity == 0) {
        this.checkoutService.markOutofStocks(element);//mark out of stock
      }
      else {
        const res = this.checkoutService.updateProductsStocks(element);//update stocks
        console.log(res);
        }
    });

    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    
    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card m onths: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);
  
    this.formService.getStates().subscribe(
      data => {

        if(formGroupName == 'shippingAddress') 
          this.shippingAddressStates = data;
        else 
          this.billingAddressStates = data;

     //  formGroup.get('state').setValue(data[0]);
      } 
    );
  }

  getCities(formControlName: string, formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const stateName  = formGroup.get(formControlName).value;

    this.formService.getCities(stateName).subscribe(
      data => {                                                     
   
        if(formGroupName == 'billingAddress')
          this.billingAddressCities = data;
        else
          this.shippingAddressCities = data;

   //       formGroup.get('city').setValue(data[0]);
      }
    );
  }

  changeState(event) {
  
  }

  changeCity() {

  }
}

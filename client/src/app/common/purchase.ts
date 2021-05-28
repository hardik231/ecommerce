import { OrderItem } from "./order-item";


export class Purchase {
        
    firstName: string
    lastName: string
    email: string
    
    shippingAddressStreet: string
    shippingAddressCity: string
    shippingAddressState: string
    shippingAddressCountry: string
    shippingAddressZipCode: number

    billingAddressStreet: string
    billingAddressCity: string
    billingAddressState: string
    billingAddressCountry: string
    billingAddressZipCode: number
    
    creditCardType: string
    creditCardNameOnCard: string
    creditCardNumber: number
    creditCardSecurityCode: number
    // creditCardExpirationDate: number
    // creditCardExpirationYear: number
    

    orderItems: OrderItem[]

    totalQuantity: number
    totalPrice: number
}

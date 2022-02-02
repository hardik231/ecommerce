import { Product } from './product';

export class CartItem {

    _id: Number
    name: string
    category: string
    price: number
    description: string
    unitsIntStock: number
    imageUrl: string

    quantity: number

    constructor(product: Product) {
        this._id = product._id
        this.name = product.name;
        this.category = product.category;
        this.price = product.price;
        this.description = product.description;
        this.unitsIntStock = product.unitsInStock;
        this.imageUrl = product.imageUrl;

        this.quantity = 1;
    }

}

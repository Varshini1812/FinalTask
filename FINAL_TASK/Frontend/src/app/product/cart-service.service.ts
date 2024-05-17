// import { Injectable, EventEmitter } from '@angular/core';
// import { ProductModel } from './product.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartServiceService {
//   private cartItems: ProductModel[] = [];
//   cartItemCount = 0;
//   totalCost = 0;

//   cartItemAdded = new EventEmitter<boolean>();

//   constructor() { }

//   getCartItems(): ProductModel[] {
//     return this.cartItems;
//   }

//   getCartItemCount(): number {
//     return this.cartItemCount;
//   }

//   getTotalCost(): number {
//     return this.totalCost;
//   }

//   addToCart(product: ProductModel) {
//     this.cartItems.push(product);
//     this.cartItemCount++;
//     this.totalCost += product.productPrice;
//     this.cartItemAdded.emit(true); 
//   }

//   clearCart() {
//     this.cartItems = [];
//     this.cartItemCount = 0;
//     this.totalCost = 0;
//   }
// }
import { Injectable, EventEmitter } from '@angular/core';
import { ProductModel } from './product.model';
export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cartItems: ProductModel[] = [];
  cartItemCount = 0;
  totalCost = 0;
  private carts: Map<string, CartItem[]> = new Map();
  cartItemAdded = new EventEmitter<boolean>();

  constructor() {
    
    this.loadCartData();
  }

  private loadCartData() {
    const cartData = localStorage.getItem('cartData');
    if (cartData) {
      const { items, count, cost } = JSON.parse(cartData);
      this.cartItems = items;
      this.cartItemCount = count;
      this.totalCost = cost;
    }
  }

  private saveCartData() {
    const cartData = {
      items: this.cartItems,
      count: this.cartItemCount,
      cost: this.totalCost
    };
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }

  

  getCartItemCount() {
    return this.cartItemCount;
  }

  getTotalCost() {
    return this.totalCost;
  }

  public addToCart(userId: string, item: CartItem): void {
    if (!this.carts.has(userId)) {
        this.carts.set(userId, []);
    }
    this.carts.get(userId)!.push(item);
}

// Get user's cart items
public getCartItems(userId: string): CartItem[] {
    return this.carts.get(userId) || [];
}
  clearCart() {
    this.cartItems = [];
    this.cartItemCount = 0;
    this.totalCost = 0;
    this.saveCartData(); 
  }
}

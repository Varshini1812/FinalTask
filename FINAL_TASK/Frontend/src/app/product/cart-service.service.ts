import { Injectable, EventEmitter } from '@angular/core';
import { ProductModel } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartItemCount = 0;
  totalCost = 0;
  private cartItems: any[] = [];
  cartDetailsEmitter: EventEmitter<{ totalItems: number, totalCost: number, userId: string | null }> = new EventEmitter();
  cartItemAdded = new EventEmitter<boolean>();

  constructor() { }

  // getCartItems(): ProductModel[] {
  //   return this.cartItems;
  // }

  getCartItemCount(userId: string | null): number {
    // Implement logic to get cart item count for a specific user
    // For example, filter cart items based on userId
    if (!userId) {
      return 0; // Return 0 if userId is null
    }
    return this.cartItems.filter(item => item.userId === userId).length;
  }

  getTotalCost(userId: string | null): number {
    // Implement logic to get total cost of items for a specific user
    // For example, filter cart items based on userId and sum up their prices
    if (!userId) {
      return 0; // Return 0 if userId is null
    }
    return this.cartItems.filter(item => item.userId === userId).reduce((total, item) => total + item.price, 0);
  }

  // addToCart(product: ProductModel) {
  //   this.cartItems.push(product);
  //   this.cartItemCount++;
  //   this.totalCost += product.productPrice;
  //   this.cartItemAdded.emit(true); 
  // }

  addToCart(product: any): void {
    // Add product to the cart
    this.cartItems.push(product);
  }

  getCartItems(): any[] {
    // Return the cart items
    return this.cartItems;
  }

  emitCartDetails(cartDetails: { totalItems: number, totalCost: number, userId: string | null }): void {
    // Emit cart details
    this.cartDetailsEmitter.emit(cartDetails);
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemCount = 0;
    this.totalCost = 0;
  }
}
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

//   constructor() {
    
//     this.loadCartData();
//   }

//   private loadCartData() {
//     const cartData = localStorage.getItem('cartData');
//     if (cartData) {
//       const { items, count, cost } = JSON.parse(cartData);
//       this.cartItems = items;
//       this.cartItemCount = count;
//       this.totalCost = cost;
//     }
//   }

//   private saveCartData() {
//     const cartData = {
//       items: this.cartItems,
//       count: this.cartItemCount,
//       cost: this.totalCost
//     };
//     localStorage.setItem('cartData', JSON.stringify(cartData));
//   }

//   getCartItems() {
//     return this.cartItems;
//   }

//   getCartItemCount() {
//     return this.cartItemCount;
//   }

//   getTotalCost() {
//     return this.totalCost;
//   }

//   addToCart(product: ProductModel) {
//     this.cartItems.push(product);
//     this.cartItemCount++;
//     this.totalCost += product.productPrice;
//     this.saveCartData(); 
//     this.cartItemAdded.emit(true);
//   }

//   clearCart() {
//     this.cartItems = [];
//     this.cartItemCount = 0;
//     this.totalCost = 0;
//     this.saveCartData(); 
//   }
// }

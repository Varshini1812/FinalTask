
// import { Component } from '@angular/core';
// import { AuthServiceService } from '../../auth/auth-service.service';
// import { CartServiceService } from '../../product/cart-service.service';
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent {
//   isLoggedIn: boolean = false;
//   username: string = '';
//   cartItemCount: number = 0;
//   totalCost: number = 0;
//   // constructor() {}
//   // constructor(private dialog: MatDialog,private service:AuthDialogService) {}
//   // openSignInPopup() : void {
//   //   this.service.openSignInPopupDialog();
//   // }
//   // constructor(private router: Router) {}

//   // signIn() {
   
//   //   this.router.navigate(['/auth/login']);
//   // }

//   // logout() {
  
//   //   this.router.navigate(['/auth/logout']);
//   // }
//   constructor(private authService:AuthServiceService,private cartService: CartServiceService) { }

//   ngOnInit(): void {
//     console.log("ngOnInit executed"); 
//     this.isLoggedIn = this.authService.isLoggedIn();
  
//     if (this.isLoggedIn) {
//       this.username = this.authService.getUsername(); 
//       console.log("username:", this.username);
//     }
//     this.cartService.cartItemAdded.subscribe(() => {
//       this.updateCartInfo();
//     });

   
   
//   }
//   private updateCartInfo() {
//     this.cartItemCount = this.cartService.getCartItemCount();
//     this.totalCost = this.cartService.getTotalCost();
//   }
  
  
//   logout(): void {
//     this.authService.logout().subscribe(() => {
//       this.isLoggedIn = false;
//       this.username = '';
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { CartServiceService } from '../../product/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  cartItemCount: number = 0;
  totalCost: number = 0;

  constructor(private authService: AuthServiceService, private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
      const userId = this.authService.getUserId(); // Assuming getUserId() returns the user ID as a string
      if (userId !== null) {
        this.updateCartInfo(userId); // Update cart info using user ID
      }
    }
  
    // Subscribe to cart details updates
    this.cartService.cartDetailsEmitter.subscribe(cartDetails => {
      this.cartItemCount = cartDetails.totalItems;
      this.totalCost = cartDetails.totalCost;
    });
  }
  private updateCartInfo(userId: string): void {
    this.cartItemCount = this.cartService.getCartItemCount(userId);
    this.totalCost = this.cartService.getTotalCost(userId);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.username = '';
    });
  }
}

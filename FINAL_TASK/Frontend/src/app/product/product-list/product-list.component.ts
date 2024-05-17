// import { ProductAddComponent } from './../product-add/product-add.component';
// // // import { Component } from '@angular/core';
// // // import { ProductAddDialogService } from '../product-add-dialog.service';


// // // @Component({
// // //   selector: 'app-product-list',
// // //   templateUrl: './product-list.component.html',
// // //   styleUrl: './product-list.component.css'
// // // })
// // // export class ProductListComponent {
// // //   constructor(private productAddDialogService: ProductAddDialogService) {}

// // //   openProductAddDialog(): void {
// // //     this.productAddDialogService.openProductAddDialog();
// // //   }
// // // }
// // // product-list.component.ts

// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup } from '@angular/forms';
// // import { ProductAddDialogService } from '../product-add-dialog.service';
// // import { ProductServiceService } from '../product-service.service';
// // import { ProductModel } from '../product.model';
// // import { MatSnackBar } from '@angular/material/snack-bar';
// // @Component({
// //   selector: 'app-product-list',
// //   templateUrl: './product-list.component.html',
// //   styleUrls: ['./product-list.component.css']
// // })
// // export class ProductListComponent implements OnInit{
// //   categories: string[] = [];
// //   products: ProductModel[] = [];
// //   productForm: FormGroup;
// //   cartCount: number = 0;

// //   constructor(private formBuilder: FormBuilder,private productAddDialogService: ProductAddDialogService,private service:ProductServiceService, private snackBar: MatSnackBar) {
// //     this.productForm = this.formBuilder.group({
// //       productName: [''],
// //       productImage: [''],
// //       productBrand: [''],
// //       productPrice: [''],
// //       productRatings: [''],
// //       productCategory: ['']
// //     });
// //   }

// //   ngOnInit(){
// //     // this.loadCategories();
// //     this.service.getProducts().subscribe((products: ProductModel[]) => {
// //       this.products = products;
// //     });
// //   }
// //   openProductAddDialog(): void {
// //         this.productAddDialogService.openProductAddDialog();
// //       }

// //       // loadCategories():void{
// //       //   this.service.getCategories().subscribe(categories => {
// //       //     this.categories = categories;
// //       //   });
// //       // }
// //   submitForm() {
// //     // Handle form submission
// //   }
// //   editProduct(product: any) {
// //     const dialogRef = this.dialog.open(ProductEditComponent, {
// //       data: product // Pass product data to the edit dialog
// //     });

// //     dialogRef.afterClosed().subscribe(result => {
     
// //       console.log('The edit dialog was closed');
// //     });
// //   }
// //   deleteProduct(product: any) {
// //     const index = this.products.indexOf(product);
// //     if (index >= 0) {
// //       this.products.splice(index, 1);
// //       this.showSnackBar('Product deleted');
// //     }
// //   }
// //   addToCart(product: any) {
// //     this.cartCount++;
// //     this.showSnackBar('Product added to cart');
// //   }
// //   filterProducts() {
// //     // Implement product filtering based on selected filters
// //   }
// //   getStarRating(rating: number): string {
// //     const roundedRating = Math.round(rating); 
// //     return '⭐'.repeat(roundedRating); 
// //   }
// //   showSnackBar(message: string): void {
// //     this.snackBar.open(message, 'Close', {
// //       duration: 3000 
// //     });
// //   }
// // }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ProductAddDialogService } from '../product-add-dialog.service';
// import { ProductServiceService } from '../product-service.service';
// import { ProductModel } from '../product.model';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   categories: string[] = [];
//   products: ProductModel[] = [];
//   productForm: FormGroup;
//   cartCount: number = 0;

//   constructor(
//     private formBuilder: FormBuilder,
//     private productAddDialogService: ProductAddDialogService,
//     private service: ProductServiceService,
//     private dialog: MatDialog,
//     private snackBar: MatSnackBar
//   ) {
//     this.productForm = this.formBuilder.group({
//       productName: [''],
//       productImage: [''],
//       productBrand: [''],
//       productPrice: [''],
//       productRatings: [''],
//       productCategory: ['']
//     });
//   }

//   ngOnInit() {
//     // Load products and categories
//     this.loadProducts();
//     // this.loadCategories();
//   }

//   loadProducts() {
//     this.service.getProducts().subscribe((products: ProductModel[]) => {
//       this.products = products;
//     });
//   }

//   openProductAddDialog(): void {
//     this.productAddDialogService.openProductAddDialog();
//   }

//   // loadCategories(): void {
//   //   this.service.getCategories().subscribe(categories => {
//   //     this.categories = categories;
//   //   });
//   // }

//   submitForm() {
//     // Handle form submission
//   }

//   editProduct(product: ProductModel) {
//     const dialogRef = this.dialog.open(ProductAddComponent, {
//       data: { product, isEditing: true } 
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result === true) {
//         this.snackBar.open('Changes saved successfully', 'Close', {
//           duration: 3000
//         });
//       }
//     });
//   }

//   deleteProduct(product: ProductModel) {
//     const index = this.products.indexOf(product);
//     if (index >= 0) {
//       this.products.splice(index, 1);
//       this.showSnackBar('Product deleted');
//     }
//   }

//   addToCart(product: any) {
//     this.cartCount++;
//     this.showSnackBar('Product added to cart');
//   }

//   filterProducts() {
//     // Implement product filtering based on selected filters
//   }

//   getStarRating(rating: number): string {
//     const roundedRating = Math.round(rating);
//     return '⭐'.repeat(roundedRating);
//   }

//   showSnackBar(message: string): void {
//     this.snackBar.open(message, 'Close', {
//       duration: 3000
//     });
//   }
// }
import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductServiceService } from '../product-service.service';
import { ProductModel } from '../product.model';
import { CartServiceService } from '../cart-service.service';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  categories: string[] = [];
  products: ProductModel[] = [];
  productForm: FormGroup;
  cartCount: number = 0;
  brandFilter: string = '';
  priceFilter: number | null = null;
  ratingFilter: number | null = null;
  filteredProducts: any[] = [];
  isLoggedIn: boolean = false;
selectedBrand: string = '';
selectedStarRating: number = 0;
minPrice: number = 0;
maxPrice: number = Infinity;

currentPage: number = 1;
  pageSize: number = 6;
  totalItems: number = 0;
  totalPages: number = 0;
  enteredSearchValue: string = '';
passObjects:any[]=[{'name':'varsh'},{'name':'sen'}]
  constructor(
    private formBuilder: FormBuilder,
    private service: ProductServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cartService:CartServiceService,
    private authService:AuthServiceService,
    private router:Router
  ) {
    this.productForm = this.formBuilder.group({
      productName: [''],
      productImage: [''],
      productBrand: [''],
      productPrice: [''],
      productRatings: [''],
      productCategory: ['']
    });
  }
  ngOnInit() {
    this.loadProducts();
    this.isLoggedIn = this.authService.isLoggedIn();
    // this.filteredProducts = this.products;
    

  }
 

  

  // loadProducts() {
  //   this.service.getProducts().subscribe((products: ProductModel[]) => {
  //     this.products = products;
  //   });
  // }
  loadProducts() {
    this.service.getProducts(this.currentPage, this.pageSize)
    .subscribe((data: any) => {
        console.log("response data:", data);
        this.products = data.products;
       
        this.totalItems = data.totalItems;
        console.log("totalItems:", this.totalItems);
        this.calculateTotalPages();
        this.applyFilters();
    });
}
getProductImageUrl(filename: string): string {
  return this.service.getImageUrl(filename);
}
onSearchInputChange(event: Event) {
  const searchText = (event.target as HTMLInputElement).value;
  if (!searchText.trim()) {
    this.filteredProducts = [...this.products];
  } else {
    this.filteredProducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}

 

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize); 
  }
  openProductAddDialog(): void {
    if (this.isLoggedIn) {
      const dialogRef = this.dialog.open(ProductAddComponent, {
        data: { isEditing: false }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.snackBar.open('Product added successfully', 'Close', {
            duration: 3000
          });
          this.loadProducts();
        }
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
  editProduct(product: ProductModel): void {
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/auth/login'); 
      return;
    }
    const dialogRef = this.dialog.open(ProductAddComponent, {
      data: { product, isEditing: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.snackBar.open('Changes saved successfully', 'Close', {
          duration: 3000
        });
        this.loadProducts();
      }
    });
  }

  deleteProduct(product: ProductModel): void {
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/auth/login'); // Navigate to login page if not logged in
      return;
    }
    const productId = product._id;
    this.service.deleteProduct(productId).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.snackBar.open('Product deleted successfully', 'Close', {
          duration: 3000
        });
        this.loadProducts();
      },
      error => {
        console.error('Error deleting product:', error);
      }
    );
  }

  // addToCart(product: any): void {
  //   if (!this.isLoggedIn) {
  //     this.router.navigateByUrl('/auth/login'); 
  //     return;
  //   }
  //   this.cartCount++;
  //   this.cartService.addToCart(product);
  //   this.snackBar.open('Product added to cart', 'Close', {
  //     duration: 3000
  //   });
  // }
  addToCart(product: any): void {
    const userId = this.authService.isLoggedIn() ? this.authService.getUserId() : ''; 
    if (!userId) {
        this.router.navigateByUrl('/auth/login'); 
        return;
    }
    const productWithUserId = { ...product, userId };
    this.cartService.addToCart(userId, productWithUserId);
    
    this.snackBar.open('Product added to cart', 'Close', {
        duration: 3000
    });
}

  
  getStarRating(rating: number): string {
    const roundedRating = Math.round(rating);
    return '⭐'.repeat(roundedRating);
  }
  onFilterChange(filter: { rating: number, minPrice: number, maxPrice: number }) {
    console.log('Filter:', filter);
    
  }
 
  

  applyFilters() {
    if (!this.products) {
        return; 
    }

    if (this.selectedBrand && this.selectedStarRating && this.maxPrice) {
      this.filteredProducts = this.products.filter(product => 
        product.productBrand === this.selectedBrand &&
        product.productRatings === this.selectedStarRating &&
        product.productPrice <= this.maxPrice
      );
    } else if (this.selectedBrand && this.selectedStarRating) {
      this.filteredProducts = this.products.filter(product => 
        product.productBrand === this.selectedBrand && product.productRatings === this.selectedStarRating
      );
    } else if (this.selectedBrand) {
      this.filteredProducts = this.products.filter(product => product.productBrand === this.selectedBrand);
    } else if (this.selectedStarRating) {
      this.filteredProducts = this.products.filter(product => product.productRatings === this.selectedStarRating);
    } else if (this.maxPrice) {
      this.filteredProducts = this.products.filter(product => product.productPrice <= this.maxPrice);
    } else {
      this.filteredProducts = this.products;
    }
}

  uniqueBrands(): string[] {
    if (!this.products) {
        return []; 
    }
    return [...new Set(this.products.map(product => product.productBrand))];
}
  getStarFRating(ratings: number[]): number {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const total = ratings.reduce((acc, cur) => acc + cur, 0);
    return total / ratings.length;
  }
  onBrandSelectionChange() {
    console.log('Selected brand:', this.selectedBrand);
    this.applyFilters();
  }
  onMinPriceChange() {
    console.log('Min price:', this.minPrice);
    this.applyFilters();
  }
  
  onMaxPriceChange() {
    console.log('Max price:', this.maxPrice);
    this.applyFilters();
  }
  setStarRatingFilter(star: number) {
    this.selectedStarRating = star;
    this.applyFilters(); 
  }

  
}

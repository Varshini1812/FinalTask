// import { Component } from '@angular/core';
// import { ProductAddDialogService } from '../product-add-dialog.service';


// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrl: './product-list.component.css'
// })
// export class ProductListComponent {
//   constructor(private productAddDialogService: ProductAddDialogService) {}

//   openProductAddDialog(): void {
//     this.productAddDialogService.openProductAddDialog();
//   }
// }
// product-list.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductAddDialogService } from '../product-add-dialog.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  categories: string[] = ['Category 1', 'Category 2', 'Category 3']; // Sample categories
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private productAddDialogService: ProductAddDialogService) {
    this.productForm = this.formBuilder.group({
      productName: [''],
      productImage: [''],
      productBrand: [''],
      productPrice: [''],
      productRatings: [''],
      productCategory: ['']
    });
  }
  openProductAddDialog(): void {
        this.productAddDialogService.openProductAddDialog();
      }
  submitForm() {
    // Handle form submission
  }

  filterProducts() {
    // Implement product filtering based on selected filters
  }
}

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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductAddDialogService } from '../product-add-dialog.service';
import { ProductServiceService } from '../product-service.service';
import { ProductModel } from '../product.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  categories: string[] = [];
  products: ProductModel[] = [];
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private productAddDialogService: ProductAddDialogService,private service:ProductServiceService) {
    this.productForm = this.formBuilder.group({
      productName: [''],
      productImage: [''],
      productBrand: [''],
      productPrice: [''],
      productRatings: [''],
      productCategory: ['']
    });
  }

  ngOnInit(){
    // this.loadCategories();
    this.service.getProducts().subscribe((products: ProductModel[]) => {
      this.products = products;
    });
  }
  openProductAddDialog(): void {
        this.productAddDialogService.openProductAddDialog();
      }

      // loadCategories():void{
      //   this.service.getCategories().subscribe(categories => {
      //     this.categories = categories;
      //   });
      // }
  submitForm() {
    // Handle form submission
  }

  filterProducts() {
    // Implement product filtering based on selected filters
  }
}

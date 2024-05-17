// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ProductServiceService } from '../product-service.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// @Component({
//   selector: 'app-product-add',
//   templateUrl: './product-add.component.html',
//   styleUrl: './product-add.component.css'
// })
// export class ProductAddComponent {
//   productForm: FormGroup;

//   constructor( private fb: FormBuilder,private service:ProductServiceService,private snackBar: MatSnackBar) {
//     this.productForm = this.fb.group({
//       productName: ['', Validators.required],
//       productImage: [''],
//       productBrand: ['', Validators.required],
//       productCategory:['', Validators.required],
//       productPrice: ['', [Validators.required, Validators.min(0)]],
//       productRatings: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
//     });
//   }

//   submitForm() {
//     if (this.productForm.valid) {
//       this.service.addProduct(this.productForm.value).subscribe(
//         response => {
//           console.log('Product added successfully:', response);
//           this.showSuccessMessage('Product added successfully');
//           this.productForm.reset();
//         },
//         error => {
//           console.error('Error adding product:', error);
          
//         }
//       );
//     }
//   }
//   showSuccessMessage(message: string): void {
//     this.snackBar.open(message, 'Close', {
//       duration: 3000, 
//       verticalPosition: 'top' // or 'bottom'
//     });
//   }
  
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../product-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent  {
  productForm: FormGroup;
  isEditing: boolean = false; // Flag to indicate if editing or adding new product
  productId: string | null = null; // ID of the product being edited
  selectedFile: File | null = null;
  constructor(
    private fb: FormBuilder,
    private service: ProductServiceService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productImage: [''],
      productBrand: ['', Validators.required],
      productCategory: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productRatings: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

 
  onFileChange(event: any) {
    const selectedFile = event.target.files[0];
console.log(selectedFile)
    this.service.uploadImage(selectedFile)
      .subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          this.productForm.patchValue({
            productImage: response,  
        });
        console.log("responsePath:",this.productForm.get('productImage')?.value)
          
        },
        (error) => {
          console.error('Error uploading file:', error);
         
        }
      );
}

  submitForm() {
    console.log("productImagenewpath:",this.productForm.get('productImage')?.value);
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      if (this.isEditing) {
        // If editing, update existing product
        this.service.updateProduct(this.productId!, formData).subscribe(
          response => {
            console.log('Product updated successfully:', response);
            this.showSnackBar('Product updated successfully');
          },
          error => {
            console.error('Error updating product:', error);
          }
        );
      } else {
        // If adding new product
        this.service.addProduct(formData).subscribe(
          response => {
            console.log('Product added successfully:', response);
            this.showSnackBar('Product added successfully');
          },
          error => {
            console.error('Error adding product:', error);
          }
        );
      }
    }
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}


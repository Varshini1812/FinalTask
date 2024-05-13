import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../product-service.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  productForm: FormGroup;

  constructor( private fb: FormBuilder,private service:ProductServiceService) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productImage: [''],
      productBrand: ['', Validators.required],
      productCategory:['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productRatings: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  submitForm() {
    if (this.productForm.valid) {
      this.service.addProduct(this.productForm.value).subscribe(
        response => {
          console.log('Product added successfully:', response);
          this.productForm.reset();
        },
        error => {
          console.error('Error adding product:', error);
          
        }
      );
    }
  }
  
}

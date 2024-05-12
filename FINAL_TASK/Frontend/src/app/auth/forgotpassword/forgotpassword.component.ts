import { Component,OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit {
    forgotForm!: FormGroup;
errorMessage!:string;
successMessage!:string;
    constructor(private formBuilder: FormBuilder, private service: AuthServiceService) {}

    ngOnInit(): void {
      this.forgotForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]]
      });
  }

    submitForgotPassword() {
        if (this.forgotForm.invalid) {
            return;
        }
console.log("form submitted")
        const email = this.forgotForm.value.email;
        this.service.forgotPassword(email).subscribe(
          response => {
             this.successMessage='Check your email'
              console.log('Reset password instructions sent successfully');
          },
          error => {
              
              console.error('Error sending reset password instructions:', error);
              
              this.errorMessage = 'Failed to send reset password instructions. Please try again later.';
          }
      );
    }
}

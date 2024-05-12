import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute ,Router} from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent  implements OnInit {
  resetToken: string = '';
  newPassword: string = '';
  resetStatus: string = '';
  email: string = '';
  resetForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service:AuthServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmpassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params); 
      this.resetToken = params['token'];
      
      console.log(this.resetToken); 

    });
    
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmpassword');

    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  resetPassword() {
    if (!this.resetToken) {
    
      console.error('Reset token is undefined');
      return;
    }
    if (this.resetForm.valid) {
      console.log(this.resetToken)
      console.log(this.newPassword)
      this.service.resetPassword(this.resetToken, this.newPassword)
        .subscribe(
          response => {
            this.resetStatus = response.message;
            console.log('Password successfully reset');
          // Navigate to the login page
          this.router.navigate(['/login']);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 400) {
              this.resetStatus = 'Invalid or expired token';
            } else {
              this.resetStatus = 'An error occurred while resetting password';
            }
            console.error('Error resetting password:', error);
          }
        );
    }
  }
  
}

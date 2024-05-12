import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  constructor(private formBuilder: FormBuilder, private service: AuthServiceService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      rememberMe: [false]
    });
  }
  ngOnInit(): void {
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      this.loginForm.patchValue({ email: storedEmail });
      this.loginForm.patchValue({ rememberMe: true }); 
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log('Email value to be stored in local storage:', this.loginForm.value.email);

   
    localStorage.setItem('rememberedEmail', this.loginForm.value.email);
    
    console.log('Form Valid:', this.loginForm.valid);
    console.log('Form Value:', this.loginForm.value);
    this.service.loginUser(this.loginForm.value).subscribe(
      response => {
        if ( response.accessToken && response.refreshToken) {
          // Extracting tokens from the response
          const refreshToken=response.refreshToken
          const accessToken=response.accessToken
          const username=response.username

        console.log("refresh",refreshToken)
          // Storing tokens in the local storage
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('username',username)
          
        }
       
        this.router.navigate(['/product']);
        if (this.loginForm.value.rememberMe) {
          localStorage.setItem('rememberedEmail', this.loginForm.value.email);
        } 
      },
      error => {
        if (error.status === 404) {
          this.errorMessage = 'User not found';
        } else if (error.status === 401) {
          this.errorMessage = 'Incorrect password';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        console.error('Error logging in:', error);
        console.log('Error object:', error);
      }
    );
    
  }
}

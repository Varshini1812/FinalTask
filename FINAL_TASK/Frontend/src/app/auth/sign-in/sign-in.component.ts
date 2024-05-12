
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { AuthServiceService } from '../auth-service.service';
// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrl: './sign-in.component.css'
// })
// export class SignInComponent {


//   registerForm!: FormGroup;
//   passwordConfirmationControl!: FormControl;

//   constructor(private formBuilder: FormBuilder,private service:AuthServiceService) {}
//   ngOnInit(): void {
//     this.passwordConfirmationControl = new FormControl('', Validators.required);
//       this.registerForm=this.formBuilder.group({
//         username: ['', Validators.required],
//         email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$')]],
//         password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
//         confirmPassword: this.passwordConfirmationControl,
//         phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]], 
//         age: ['', Validators.required],
//         gender: ['', Validators.required]
//       }, { validator: this.passwordMatchValidator });
     
//       };
//       passwordMatchValidator(formGroup: FormGroup) {
//         const passwordControl = formGroup.get('password');
//         const confirmPasswordControl = formGroup.get('confirmPassword');
    
//         if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
//           confirmPasswordControl.setErrors({ passwordMismatch: true });
//         } else {
//           confirmPasswordControl?.setErrors(null);
//         }
//       }
    
    
  



// onSubmit(){
//   if (this.registerForm.invalid) {
//     return;
//   }
//   console.log('Form Valid:', this.registerForm.valid);
//     console.log('Form Value:', this.registerForm.value);
//     this.service.registerUser(this.registerForm.value).subscribe(
//       response => {
//         console.log('Form submitted successfully!', response);
        

//         if ( response.accessToken && response.refreshToken) {
//           // Extracting tokens from the response
//           const refreshToken=response.refreshToken
//           const accessToken=response.accessToken

        
//           // Storing tokens in the local storage
//           localStorage.setItem('accessToken', accessToken);
//           localStorage.setItem('refreshToken', refreshToken);
//         } else {
//           // Handle the case where response.data or the expected properties are missing
//           console.error('Response data or tokens are missing:', response.data);
//         }
//         this.registerForm.reset();
//       },
//       error => {
//         console.error('Error submitting form:', error);
//       }
//     );
// }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: AuthServiceService) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern('^[A-Z].*')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$')]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmpassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  get passwordErrorMessage() {
    const passwordControl = this.registerForm.get('password');
    if (!passwordControl) return '';

    if (passwordControl.hasError('required')) {
      return 'Password is required.';
    }
    if (passwordControl.hasError('minlength')) {
      return 'Password should be at least 8 characters long.';
    }
    if (passwordControl.hasError('pattern')) {
      return 'Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
    }
    return '';
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    console.log('Form Valid:', this.registerForm.valid);
    console.log('Form Value:', this.registerForm.value);
    
    this.service.registerUser(this.registerForm.value).subscribe(
      response => {
        console.log('Form submitted successfully!', response);

        if (response.accessToken && response.refreshToken) {
          // Extracting tokens from the response
          const refreshToken = response.refreshToken;
          const accessToken = response.accessToken;

          // Storing tokens in the local storage
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        } else {
          // Handle the case where response.data or the expected properties are missing
          console.error('Response data or tokens are missing:', response.data);
        }

        this.registerForm.reset();
      },
      error => {
        console.error('Error submitting form:', error);
      }
    );
  }
}

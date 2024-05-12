
import { Component } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  username: string = '';
  // constructor() {}
  // constructor(private dialog: MatDialog,private service:AuthDialogService) {}
  // openSignInPopup() : void {
  //   this.service.openSignInPopupDialog();
  // }
  // constructor(private router: Router) {}

  // signIn() {
   
  //   this.router.navigate(['/auth/login']);
  // }

  // logout() {
  
  //   this.router.navigate(['/auth/logout']);
  // }
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
    console.log("ngOnInit executed"); // Add this line
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log("isLoggedIn:", this.isLoggedIn); // Log the value of isLoggedIn
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername(); 
      console.log("username:", this.username);
    }
  }
  
  
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.username = '';
    });
  }
}

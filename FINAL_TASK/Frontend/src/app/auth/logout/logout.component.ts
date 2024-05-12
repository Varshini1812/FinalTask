import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service:AuthServiceService, private router: Router) { }

  ngOnInit(): void {
   
    this.logout();
  }

  logout(): void {
    
    this.service.logout();

    
    this.router.navigate(['/login']);
  }
}

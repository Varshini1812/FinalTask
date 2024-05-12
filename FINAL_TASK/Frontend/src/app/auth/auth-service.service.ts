// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {
//   private baseUrl = 'http://localhost:3000'; 
//   constructor(private http: HttpClient) { }
//   registerUser(formData: any): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}/users`, formData);
//   }
//   loginUser(formData: any): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}/auth/login`, formData);
//   }
//   forgotPassword(email: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/auth/change-password-step1`, { email });
// }
// resetPassword(token: string, password: string): Observable<any> {
//   return this.http.post<any>(`${this.baseUrl}/auth/change-password-step2`, { password,token});
// }
// logout(): void {

//   localStorage.removeItem('accessToken');
//   localStorage.removeItem('refreshToken');

//   this.isLoggedIn = false;
//   this.username = '';
  
// }
// isLoggedIn(): boolean {
//   return this.isLoggedIn;
// }

// // Method to get the username of the logged-in user
// getUsername(): string {
//   return this.username;
// }
// login(username: string, password: string): boolean {
//   // You can implement your actual login logic here
//   // For simplicity, let's assume authentication is successful
//   this.isLoggedIn = true;
//   this.username = username;
//   return true;
// }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  registerUser(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, formData);
  }

  loginUser(formData: any): Observable<any> {
    localStorage.setItem('username',formData.username)
    return this.http.post<any>(`${this.baseUrl}/auth/login`, formData);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/change-password-step1`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/change-password-step2`, { password, token });
  }

  logout(): Observable<any> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    return this.http.post<any>(`${this.baseUrl}/auth/logout`, {});
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
  getUsername(): string {
   
    return localStorage.getItem('username') || '';
  }
}

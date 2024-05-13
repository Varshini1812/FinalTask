import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  cartUpdated: Subject<boolean> = new Subject<boolean>();
  showLogin: Subject<boolean> = new Subject<boolean>();
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

 
  addProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, productData);
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }
  getAllProductsByCategory(id: number): Observable<any[]> {
    return this.http.get<any[]>("https://freeapi.miniprojectideas.com/api/amazon/GetAllProductsByCategoryId?id="+ id);
  }

  getAllCategory(): Observable<any[]> {
    return this.http.get<any[]>("https://freeapi.miniprojectideas.com/api/amazon/GetAllCategory");
  }

  register(obj: any) : Observable<any> {
    return this.http.post<any>("https://freeapi.miniprojectideas.com/api/amazon/RegisterCustomer", obj);
  }

  

 

  // getCategories(): Observable<string[]> {
  //   return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  // }
  
}

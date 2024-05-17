import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ProductModel } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  cartUpdated: Subject<boolean> = new Subject<boolean>();
  showLogin: Subject<boolean> = new Subject<boolean>();
  formData!:ProductModel
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}
 
 
 
  addProduct(formData: FormData): Observable<any> {
    console.log("formDATA:",formData)
    return this.http.post<any>(`${this.apiUrl}/products`, formData);
  }
  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('file', image);
    console.log("image:",image)
    console.log("imageforn:",formData)
    return this.http.post<any>(`${this.apiUrl}/file`, formData);
  }
  updateProduct(productId: string, productData: any): Observable<any> {
    console.log(productId);
    const url = `${this.apiUrl}/products/${productId}`;
    console.log(url)
    return this.http.put<any>(url, productData);
  }
  uploadProduct(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/general/upload`, formData);
  }
  deleteProduct(productId: string): Observable<void> {
    const url = `${this.apiUrl}/products/${productId}`; 
    return this.http.delete<void>(url);
  }
  // getAllProducts(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/products`);
  // }
  
  getAllUniqueBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/brand`);
  }
  
  getProducts(page: number, pageSize: number) {
    return this.http.get(`${this.apiUrl}/products?page=${page}&pageSize=${pageSize}`);
  }
 
  getImageUrl(filename: string): string {
    
    return `${this.apiUrl}/file/${filename}`;
   
  }
  // getCategories(): Observable<string[]> {
  //   return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  // }
  
}

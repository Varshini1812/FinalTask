import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getAccessToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('accessToken');
    } else {
      
      return null;
    }
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  refreshTokens(refreshToken: string): Observable<{ accessToken: string | null, refreshToken: string | null }> {
    return this.http.post<{ accessToken: string | null, refreshToken: string | null }>(`${this.baseUrl}/auth/refresh-token`, { refreshToken });
  }
}

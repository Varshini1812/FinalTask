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
   return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjQwYjM4ZDkzOTk2NjU2YjNjNDc1OGYiLCJzY29wZSI6WyJ1c2VyIl0sIm5hbWUiOiJWYXJzaGluaSIsImlhdCI6MTcxNTc0Nzk4MCwiZXhwIjoxNzE1NzUxNTgwfQ.MoNCr52OdqU2JGSRD73KiDO1Q5ELXIkTMCWAOps3YPM'
  }

  getRefreshToken(): string | null {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjQwYjM4ZDkzOTk2NjU2YjNjNDc1OGYiLCJzY29wZSI6WyJhcGkiXSwiaWF0IjoxNzE1NzQ3OTgwLCJleHAiOjE3MTYwOTM1ODB9.OnBcyejuYaXSpGYAifCdW9itsOUeJaAaTH9uHeCQhCM'
  }

  refreshTokens(refreshToken: string): Observable<{ accessToken: string | null, refreshToken: string | null }> {
    return this.http.post<{ accessToken: string | null, refreshToken: string | null }>(`${this.baseUrl}/auth/refresh-token`, { refreshToken });
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenServiceService } from './token-service.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = this.tokenService.getAccessToken();
    const refreshToken = this.tokenService.getRefreshToken();

    return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && refreshToken) {
          
          return this.tokenService.refreshTokens(refreshToken).pipe(
            switchMap((tokens: { accessToken: string | null, refreshToken: string | null }) => {
              if (tokens.accessToken) {
                
                accessToken = tokens.accessToken;
                const authReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                  }
                });
                return next.handle(authReq);
              } else {
                return throwError('Unable to refresh token');
              }
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, accessToken: string | null): HttpRequest<any> {
    if (accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return request;
  }
}
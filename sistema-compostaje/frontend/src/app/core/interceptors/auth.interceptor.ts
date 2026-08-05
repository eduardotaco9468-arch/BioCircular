import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(TokenService).obtenerToken();

  if (!token) {
    return next(request);
  }

  return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};

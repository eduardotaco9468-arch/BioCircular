import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Rol } from '../models/rol.enum';
import { AuthService } from '../services/auth.service';

export const loginRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.estaAutenticado()) {
    return true;
  }

  const rutaPorRol: Record<Rol, string> = {
    [Rol.ADMIN]: '/admin',
    [Rol.OPERADOR]: '/operador',
    [Rol.CLIENTE]: '/cliente'
  };

  return router.createUrlTree([rutaPorRol[authService.obtenerRol()] ?? '/login']);
};

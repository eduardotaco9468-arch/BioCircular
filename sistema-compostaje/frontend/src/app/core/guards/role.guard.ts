import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Rol } from '../models/rol.enum';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const rolesPermitidos = route.data?.['roles'] as Rol[] | undefined;

  if (!authService.estaAutenticado()) {
    return router.createUrlTree(['/login']);
  }

  if (!rolesPermitidos || rolesPermitidos.includes(authService.obtenerRol())) {
    return true;
  }

  return router.createUrlTree(['/403']);
};

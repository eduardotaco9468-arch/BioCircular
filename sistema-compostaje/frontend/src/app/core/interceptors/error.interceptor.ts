import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {

  const toastService = inject(ToastService);

  return next(request).pipe(

    catchError((error) => {

      let mensaje = '';
      const serviceName = getServiceNameFromUrl(request.url);

      if (error.status) {

        switch (error.status) {

          case 401:
            mensaje = 'No autorizado. Por favor inicie sesión nuevamente.';
            break;

          case 403:
            mensaje = 'No tiene permiso para realizar esta acción.';
            break;

          case 404:
            mensaje = 'Recurso no encontrado.';
            break;

          case 500:
            mensaje = `Error interno del ${serviceName}.`;
            break;

          case 503:
            mensaje = 'Servicio no disponible. Por favor intente más tarde.';
            break;

          default:
            mensaje = `Error en ${serviceName}. Código: ${error.status}`;
        }

      } else {

        mensaje = `No fue posible conectar con ${serviceName}.`;

      }

      toastService.danger(mensaje);

      return throwError(() => error);

    })

  );

};


function getServiceNameFromUrl(url: string): string {

  if (url.includes('/auth/')) return 'Auth Service';

  if (url.includes('/gestion/clientes')) return 'Gestion Service';
  if (url.includes('/gestion/recolecciones')) return 'Gestion Service';
  if (url.includes('/gestion/rutas')) return 'Gestion Service';
  if (url.includes('/gestion/incidencias')) return 'Gestion Service';
  if (url.includes('/gestion/vehiculos')) return 'Gestion Service';
  if (url.includes('/gestion/contenedores')) return 'Gestion Service';
  if (url.includes('/gestion/mantenimientos')) return 'Gestion Service';

  if (url.includes('/compostaje/inventario')) return 'Compostaje Service';
  if (url.includes('/compostaje/residuos')) return 'Compostaje Service';
  if (url.includes('/compostaje/')) return 'Compostaje Service';

  if (url.includes('/reportes/')) return 'Reportes Service';

  if (url.includes('/dashboard/')) return 'Dashboard Service';

  return 'Servicio desconocido';

}
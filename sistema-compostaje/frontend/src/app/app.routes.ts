import { Routes } from '@angular/router';

import { MainLayout } from './layout/main-layout/main-layout';

import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/auth/login/login';
import { AccesoDenegado } from './pages/acceso-denegado/acceso-denegado';
import { Clientes } from './pages/clientes/clientes';  
import { Recolecciones } from './pages/recolecciones/recolecciones';
import { Rutas } from './pages/rutas/rutas';
import { Incidencias } from './pages/incidencias/incidencias';
import { CompostajeComponent } from './pages/compostaje/compostaje';
import { Usuarios } from './pages/usuarios/usuarios'; 
import { roleGuard } from './core/guards/role.guard';
import { loginRedirectGuard } from './core/guards/login-redirect.guard';
import { Rol } from './core/models/rol.enum';


export const routes: Routes = [

    {
        path: 'admin',
        canActivate: [roleGuard],
        data: { roles: [Rol.ADMIN], redirectToRolePanel: true },
        loadComponent: () => import('./layout/admin-layout/admin-layout').then(c => c.AdminLayout),
        children: [
            { path: '', component: Dashboard },
            { path: 'clientes', component: Clientes },
            { path: 'usuarios', component: Usuarios },
            { path: 'recolecciones', component: Recolecciones },
            { path: 'clientes', component: Clientes },
            { path: 'rutas', component: Rutas },
            { path: 'incidencias', component: Incidencias },
            { path: 'contenedores', loadComponent: () => import('./features/contenedores/components/contenedor-list/contenedor-list.component').then(c => c.ContenedorListComponent) },
            { path: 'vehiculos', loadComponent: () => import('./features/vehiculos/components/vehiculo-list/vehiculo-list.component').then(c => c.VehiculoListComponent) },
            { path: 'mantenimientos', loadComponent: () => import('./features/mantenimientos/components/mantenimiento-list/mantenimiento-list').then(c => c.MantenimientoList) },
            { path: 'residuos', loadComponent: () => import('./features/residuos/components/residuo-list/residuo-list').then(c => c.ResiduoList) },
            { path: 'inventario-compost', loadComponent: () => import('./features/inventario-compost/components/inventario-list/inventario-list').then(c => c.InventarioList) },
            { path: 'reportes', loadComponent: () => import('./features/reportes/components/reportes-dashboard/reportes').then(c => c.Reportes) }
        ]
    },

    {
        path: 'operador',
        canActivate: [roleGuard],
        data: { roles: [Rol.OPERADOR], redirectToRolePanel: true },
        loadComponent: () => import('./layout/operador-layout/operador-layout').then(c => c.OperadorLayout),
        children: [
            { path: '', component: Dashboard },
            { path: 'recolecciones', component: Recolecciones },
            { path: 'rutas', component: Rutas },
            { path: 'incidencias', component: Incidencias }
        ]
    },

    {
        path: 'cliente',
        canActivate: [roleGuard],
        data: { roles: [Rol.CLIENTE], redirectToRolePanel: true },
        loadComponent: () => import('./layout/cliente-layout/cliente-layout').then(c => c.ClienteLayout),
        children: [
            { path: '', redirectTo: 'perfil', pathMatch: 'full' },
            { path: 'perfil', loadComponent: () => import('./features/cliente/components/perfil/perfil').then(c => c.Perfil) },
            { path: 'historial', loadComponent: () => import('./features/cliente/components/historial/historial').then(c => c.Historial) },
            { path: 'aporte-ambiental', loadComponent: () => import('./features/cliente/components/aporte-ambiental/aporte-ambiental').then(c => c.AporteAmbiental) },
            { path: 'notificaciones', loadComponent: () => import('./features/cliente/components/notificaciones/notificaciones').then(c => c.Notificaciones) }
        ]
    },

    {
        path:'login',
        component: Login,
        canActivate: [loginRedirectGuard]
    },

    {
        path: '403',
        component: AccesoDenegado
    },


    {
        path:'',
        component: MainLayout,
        children:[

            {
                path:'',
                redirectTo:'dashboard',
                pathMatch:'full'
            },

            {
                path:'dashboard',
                component: Dashboard
            },

            {
                path: 'mantenimientos',
                canActivate: [roleGuard],
                data: { roles: [Rol.ADMIN] },
                loadComponent: () =>
                    import('./features/mantenimientos/components/mantenimiento-list/mantenimiento-list')
                        .then(c => c.MantenimientoList)
            },

            {
                path:'prueba-rol',
                loadComponent:()=> import(
                './shared/components/prueba-rol/prueba-rol'
                )
                .then(c=>c.PruebaRolComponent)
            },

            {
                path: 'mantenimientos/nuevo',
                canActivate: [roleGuard],
                data: { roles: [Rol.ADMIN] },
                loadComponent: () =>
                    import('./features/mantenimientos/components/mantenimiento-form/mantenimiento-form')
                        .then(c => c.MantenimientoForm)
            },

            {
                path: 'residuos',
                canActivate: [roleGuard],
                data: { roles: [Rol.ADMIN] },
                loadComponent: () =>
                    import('./features/residuos/components/residuo-list/residuo-list')
                        .then(c => c.ResiduoList)
            },

            {
                path: 'residuos/nuevo',
                canActivate: [roleGuard],
                data: { roles: [Rol.ADMIN] },
                loadComponent: () =>
                    import('./features/residuos/components/residuo-form/residuo-form')
                        .then(c => c.ResiduoForm)
            },

            {
                path: 'inventario-compost',
                canActivate: [roleGuard],
                data: { roles: [Rol.ADMIN] },
                loadComponent: () =>
                    import('./features/inventario-compost/components/inventario-list/inventario-list')
                        .then(c => c.InventarioList)
            },

            {
                path: 'inventario-compost/nuevo',
                canActivate: [roleGuard],
                data: { roles: [Rol.ADMIN] },
                loadComponent: () =>
                    import('./features/inventario-compost/components/inventario-form/inventario-form')
                        .then(c => c.InventarioForm)
            },

            {
                path: 'reportes',
                canActivate: [roleGuard],
                data: { roles: [Rol.ADMIN] },
                loadComponent: () =>
                    import('./features/reportes/components/reportes-dashboard/reportes')
                        .then(c => c.Reportes)
            },

            {
                path:'clientes',
                component: Clientes
            },

            {
                path:'recolecciones',
                canActivate: [roleGuard],
                data: { roles: [Rol.OPERADOR] },
                component: Recolecciones
            },

            {
                path:'rutas',
                canActivate: [roleGuard],
                data: { roles: [Rol.OPERADOR] },
                component: Rutas
            },

            {
                path:'incidencias',
                canActivate: [roleGuard],
                data: { roles: [Rol.OPERADOR] },
                component: Incidencias
            },

            {
                path:'compostaje',
                component: CompostajeComponent
            },
            {
                path:'usuarios',
                canActivate: [roleGuard],
                data: { roles: [Rol.ADMIN] },
                component: Usuarios
            },

            {
                path: 'contenedores',
                canActivate: [roleGuard],
                data: { roles: [Rol.ADMIN] },
                loadComponent: () =>
                    import('./features/contenedores/components/contenedor-list/contenedor-list.component')
                        .then(c => c.ContenedorListComponent)
            },

            {
                path: 'vehiculos',
                canActivate: [roleGuard],
                data: { roles: [Rol.ADMIN] },
                loadComponent: () =>
                    import('./features/vehiculos/components/vehiculo-list/vehiculo-list.component')
                        .then(c => c.VehiculoListComponent)
            }

        ]
    },


    {
        path:'**',
        redirectTo:'dashboard'
    }

];

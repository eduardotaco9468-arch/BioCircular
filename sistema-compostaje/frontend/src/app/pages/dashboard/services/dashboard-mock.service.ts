import { Injectable } from '@angular/core';

import { DashboardStat } from '../interfaces/dashboard-stat.interface';
import { DashboardActivity } from '../interfaces/dashboard-activity.interface';
import { DashboardAction } from '../interfaces/dashboard-action.interface';


@Injectable({
    providedIn:'root'
})
export class DashboardMockService {


    getStats(): DashboardStat[] {


        return [

            {
                title:'Clientes',
                value:350,
                icon:'bi-people',
                color:'primary'
            },


            {
                title:'Recolecciones',
                value:120,
                icon:'bi-truck',
                color:'success'
            },


            {
                title:'Incidencias',
                value:15,
                icon:'bi-exclamation-triangle',
                color:'warning'
            },


            {
                title:'Lotes Compostaje',
                value:42,
                icon:'bi-flower1',
                color:'info'
            }

        ];

    }
    getActivities(): DashboardActivity[] {


        return [

            {
                id:1,
                description:'Recolección completada en Sector Centro',
                date:'05/08/2026',
                status:'Completada'
            },


            {
                id:2,
                description:'Nueva incidencia registrada',
                date:'05/08/2026',
                status:'Pendiente'
            },


            {
                id:3,
                description:'Lote de compostaje actualizado',
                date:'04/08/2026',
                status:'Proceso'
            }


        ];

    }
    getActions(): DashboardAction[] {


        return [

            {
                title:'Nuevo Cliente',
                icon:'bi-person-plus',
                route:'/clientes',
                color:'primary'
            },


            {
                title:'Nueva Recolección',
                icon:'bi-truck',
                route:'/recolecciones',
                color:'success'
            },


            {
                title:'Registrar Incidencia',
                icon:'bi-exclamation-circle',
                route:'/incidencias',
                color:'warning'
            },


            {
                title:'Gestionar Compostaje',
                icon:'bi-flower1',
                route:'/compostaje',
                color:'info'
            }


        ];

    }

}
import { Injectable } from '@angular/core';

import { Cliente } from '../interfaces/cliente.interface';


@Injectable({
    providedIn:'root'
})
export class ClienteMockService {


    getClientes():Cliente[] {


        return [

            {
                id:1,
                nombre:'Juan Pérez',
                cedula:'1723456789',
                correo:'juan@biocircular.ec',
                telefono:'0999999999',
                direccion:'Av. Central',
                sector:'Centro',
                tipo:'Residencial',
                estado:true
            },


            {
                id:2,
                nombre:'Empresa Verde S.A.',
                cedula:'1798765432',
                correo:'contacto@empresaverde.ec',
                telefono:'0988888888',
                direccion:'Sector Norte',
                sector:'Norte',
                tipo:'Comercial',
                estado:true
            },


            {
                id:3,
                nombre:'María López',
                cedula:'1712345678',
                correo:'maria@biocircular.ec',
                telefono:'0977777777',
                direccion:'Barrio Sur',
                sector:'Sur',
                tipo:'Residencial',
                estado:false
            }


        ];

    }


}

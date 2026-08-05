import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';


@Component({
 selector:'app-prueba-rol',
 standalone:true,
 template:`

<h3>
Usuario actual:
</h3>

<p>
{{usuario.nombre}}
</p>


<h3>
Rol:
</h3>

<p>
{{usuario.rol}}
</p>

`
})
export class PruebaRolComponent {


usuario;


constructor(
private authService:AuthService
){

this.usuario =
this.authService.obtenerUsuarioActual();

}


}
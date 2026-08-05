import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClienteForm } from '../cliente-form/cliente-form';


@Component({

  selector: 'app-cliente-modal',

  standalone: true,

  imports: [
    ClienteForm
  ],

  templateUrl: './cliente-modal.html',

  styleUrl: './cliente-modal.css'

})
export class ClienteModal {

  @ViewChild(ClienteForm) clienteFormComponent?: ClienteForm;


  @Input()
  clienteEditar:any = null;



  @Output()
  cerrar = new EventEmitter<void>();



  @Output()
  guardar = new EventEmitter<any>();



  cerrarModal(){
    if (this.clienteFormComponent?.clienteForm.dirty && !confirm('¿Desea salir sin guardar los cambios?')) return;
    this.cerrar.emit();


  }



  guardarCliente(cliente:any){


    console.log(
      'Cliente recibido en modal:',
      cliente
    );


    this.guardar.emit(cliente);


  }


}

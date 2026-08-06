import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClienteForm } from '../cliente-form/cliente-form';
import { Cliente } from '../../interfaces/cliente.interface';


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
  clienteEditar: Cliente | null = null;



  @Output()
  cerrar = new EventEmitter<void>();



  @Output()
  guardar = new EventEmitter<Cliente>();



  cerrarModal(): void {
    if (this.clienteFormComponent?.clienteForm.dirty && !confirm('¿Desea salir sin guardar los cambios?')) return;
    this.cerrar.emit();


  }



  guardarCliente(cliente: Cliente): void {
    this.guardar.emit(cliente);
  }


}

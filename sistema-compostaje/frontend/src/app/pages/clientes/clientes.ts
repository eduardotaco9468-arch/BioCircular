import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ClienteMockService } from './services/cliente-mock.service';
import { Cliente } from './interfaces/cliente.interface';
import { ToastService } from '../../core/services/toast.service';
import { ClienteModal } from './components/cliente-modal/cliente-modal';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [ReactiveFormsModule, ClienteModal],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtroForm: FormGroup;
  mostrarModal = false;
  clienteSeleccionado: Cliente | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteMockService,
    private toastService: ToastService
  ) {
    this.filtroForm = this.fb.group({
      busqueda: [''],
      tipoSeleccionado: ['']
    });
  }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
    this.clientesFiltrados = this.clientes;
    this.filtroForm.valueChanges.subscribe(() => this.filtrarClientes());
  }

  abrirModal(): void { this.mostrarModal = true; }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.clienteSeleccionado = null;
  }

  editarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.mostrarModal = true;
  }

  eliminarCliente(cliente: Cliente): void {
    if (confirm(`¿Está seguro de eliminar el cliente ${cliente.nombre}? Esta acción no se puede deshacer.`)) {
      this.clientes = this.clientes.filter(c => c.id !== cliente.id);
      this.toastService.danger('Cliente eliminado correctamente');
      this.filtrarClientes();
    }
  }

  guardarCliente(cliente: Omit<Cliente, 'id'>): void {
    if (this.clienteSeleccionado) {
      const index = this.clientes.findIndex(c => c.id === this.clienteSeleccionado?.id);
      if (index !== -1) {
        this.clientes[index] = { ...this.clienteSeleccionado, ...cliente };
        this.toastService.info('Cliente actualizado correctamente');
      }
    } else {
      const nuevoCliente: Cliente = { id: Math.max(0, ...this.clientes.map(c => c.id)) + 1, ...cliente };
      this.clientes.push(nuevoCliente);
      this.toastService.success('Cliente creado correctamente');
    }

    this.cerrarModal();
    this.filtrarClientes();
  }

  filtrarClientes(): void {
    const busqueda = (this.filtroForm.get('busqueda')?.value ?? '').toLowerCase();
    const tipoSeleccionado = this.filtroForm.get('tipoSeleccionado')?.value ?? '';
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(busqueda) &&
      (tipoSeleccionado === '' || cliente.tipo === tipoSeleccionado)
    );
  }
}

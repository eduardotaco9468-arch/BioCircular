import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Rol } from '../../core/models/rol.enum';
import { ClienteModal } from './components/cliente-modal/cliente-modal';
import { Cliente } from './interfaces/cliente.interface';
import { ClienteService } from './services/cliente.service';

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
  cargando = false;
  mensajeExito = '';
  mensajeError = '';
  mostrarModal = false;
  mostrarConfirmacion = false;
  clienteSeleccionado: Cliente | null = null;
  clienteDetalle: Cliente | null = null;

  readonly filtroForm;

  constructor(
    private readonly fb: FormBuilder,
    private readonly clienteService: ClienteService,
    private readonly authService: AuthService
  ) {
    this.filtroForm = this.fb.nonNullable.group({ busqueda: '', estado: '' });
  }

  get esAdministrador(): boolean {
    return this.authService.tieneRol(Rol.ADMIN);
  }

  ngOnInit(): void {
    this.cargarClientes();
    this.filtroForm.valueChanges.subscribe(() => this.filtrarClientes());
  }

  cargarClientes(): void {
    this.cargando = true;
    this.mensajeError = '';
    this.clienteService.getClientes().subscribe({
      next: clientes => {
        this.clientes = clientes;
        this.filtrarClientes();
        this.cargando = false;
      },
      error: () => {
        this.mensajeError = 'No fue posible cargar los clientes.';
        this.cargando = false;
      }
    });
  }

  abrirModal(): void { this.clienteSeleccionado = null; this.mostrarModal = true; }
  editarCliente(cliente: Cliente): void { this.clienteSeleccionado = { ...cliente }; this.mostrarModal = true; }
  cerrarModal(): void { this.mostrarModal = false; this.clienteSeleccionado = null; }
  verDetalle(cliente: Cliente): void { this.clienteDetalle = cliente; }
  cerrarDetalle(): void { this.clienteDetalle = null; }
  solicitarEliminacion(cliente: Cliente): void { this.clienteSeleccionado = cliente; this.mostrarConfirmacion = true; }
  cancelarEliminacion(): void { this.mostrarConfirmacion = false; this.clienteSeleccionado = null; }

  guardarCliente(cliente: Cliente): void {
    const operacion = this.clienteSeleccionado?.id
      ? this.clienteService.actualizarCliente(this.clienteSeleccionado.id, cliente)
      : this.clienteService.crearCliente(cliente);

    operacion.subscribe({
      next: () => {
        this.mensajeExito = this.clienteSeleccionado?.id ? 'Cliente actualizado correctamente' : 'Cliente creado correctamente';
        this.mensajeError = '';
        this.cerrarModal();
        this.cargarClientes();
      },
      error: error => this.mensajeError = this.mensajeErrorDesde(error, 'No fue posible guardar el cliente.')
    });
  }

  confirmarEliminacion(): void {
    const id = this.clienteSeleccionado?.id;
    if (!id) return;

    this.clienteService.eliminarCliente(id).subscribe({
      next: () => {
        this.mensajeExito = 'Cliente eliminado correctamente';
        this.mensajeError = '';
        this.cancelarEliminacion();
        this.cargarClientes();
      },
      error: error => this.mensajeError = this.mensajeErrorDesde(error, 'No fue posible eliminar el cliente.')
    });
  }

  filtrarClientes(): void {
    const { busqueda, estado } = this.filtroForm.getRawValue();
    const termino = busqueda.toLowerCase().trim();
    this.clientesFiltrados = this.clientes.filter(cliente =>
      (!termino || cliente.nombre.toLowerCase().includes(termino)) &&
      (estado === '' || String(cliente.estado) === estado)
    );
  }

  private mensajeErrorDesde(error: { error?: { message?: string } }, predeterminado: string): string {
    return error.error?.message ? `Error: ${error.error.message}` : predeterminado;
  }
}

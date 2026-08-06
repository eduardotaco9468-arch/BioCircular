import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Rol } from '../../core/models/rol.enum';
import { RecoleccionModal } from './components/recoleccion-modal/recoleccion-modal';
import { EstadoRecoleccion, Recoleccion, RecoleccionRequest } from './interfaces/recoleccion.interface';
import { RecoleccionService } from './services/recoleccion.service';

@Component({ selector: 'app-recolecciones', standalone: true, imports: [DatePipe, ReactiveFormsModule, RecoleccionModal], templateUrl: './recolecciones.html', styleUrl: './recolecciones.css' })
export class Recolecciones implements OnInit {
  recolecciones: Recoleccion[] = []; recoleccionesFiltradas: Recoleccion[] = [];
  mostrarModal = false; recoleccionSeleccionada: Recoleccion | null = null;
  mensajeExito = ''; mensajeError = ''; cargando = false;
  readonly filtroForm;
  readonly estadosOperador: EstadoRecoleccion[] = ['PENDIENTE', 'EN_PROCESO', 'REALIZADA'];

  constructor(private readonly fb: FormBuilder, private readonly recoleccionService: RecoleccionService, private readonly authService: AuthService) {
    this.filtroForm = this.fb.nonNullable.group({ busqueda: '', estadoSeleccionado: '' });
  }
  get esAdministrador(): boolean { return this.authService.tieneRol(Rol.ADMIN); }
  get esOperador(): boolean { return this.authService.tieneRol(Rol.OPERADOR); }
  get esCliente(): boolean { return this.authService.tieneRol(Rol.CLIENTE); }
  ngOnInit(): void { this.cargarRecolecciones(); this.filtroForm.valueChanges.subscribe(() => this.filtrarRecolecciones()); }
  cargarRecolecciones(): void { this.cargando = true; this.recoleccionService.getRecolecciones().subscribe({ next: datos => { this.recolecciones = datos; this.filtrarRecolecciones(); this.cargando = false; }, error: () => { this.mensajeError = 'No fue posible cargar las recolecciones.'; this.cargando = false; } }); }
  abrirModal(): void { this.recoleccionSeleccionada = null; this.mostrarModal = true; }
  editarRecoleccion(recoleccion: Recoleccion): void { this.recoleccionSeleccionada = { ...recoleccion }; this.mostrarModal = true; }
  cerrarModal(): void { this.mostrarModal = false; this.recoleccionSeleccionada = null; }
  guardarRecoleccion(recoleccion: RecoleccionRequest): void { const operacion = this.recoleccionSeleccionada ? this.recoleccionService.actualizar(this.recoleccionSeleccionada.id, recoleccion) : this.recoleccionService.crear(recoleccion); operacion.subscribe({ next: () => { this.mensajeExito = this.recoleccionSeleccionada ? 'Recolección actualizada correctamente' : 'Recolección creada correctamente'; this.mensajeError = ''; this.cerrarModal(); this.cargarRecolecciones(); }, error: () => this.mensajeError = 'Error al guardar información' }); }
  eliminarRecoleccion(recoleccion: Recoleccion): void { if (!confirm('¿Está seguro de eliminar esta recolección?')) return; this.recoleccionService.eliminar(recoleccion.id).subscribe({ next: () => { this.mensajeExito = 'Recolección eliminada correctamente'; this.mensajeError = ''; this.cargarRecolecciones(); }, error: () => this.mensajeError = 'No fue posible eliminar la recolección.' }); }
  actualizarEstado(recoleccion: Recoleccion, estado: string): void { if (estado === recoleccion.estado) return; this.recoleccionService.actualizar(recoleccion.id, { estado: estado as EstadoRecoleccion }).subscribe({ next: () => { this.mensajeExito = 'Recolección actualizada correctamente'; this.mensajeError = ''; this.cargarRecolecciones(); }, error: () => this.mensajeError = 'Error al guardar información' }); }
  filtrarRecolecciones(): void { const { busqueda, estadoSeleccionado } = this.filtroForm.getRawValue(); const termino = busqueda.toLowerCase().trim(); this.recoleccionesFiltradas = this.recolecciones.filter(item => (!termino || [item.id, item.clienteId, item.operadorId, item.vehiculoId].some(valor => String(valor ?? '').includes(termino))) && (!estadoSeleccionado || item.estado === estadoSeleccionado)); }
  claseEstado(estado: string): string { return estado === 'REALIZADA' ? 'bg-success' : estado === 'CANCELADA' ? 'bg-danger' : estado === 'EN_PROCESO' ? 'bg-primary' : 'bg-warning text-dark'; }
}

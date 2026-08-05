import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { RecoleccionModal } from './components/recoleccion-modal/recoleccion-modal';
import { Recoleccion } from './interfaces/recoleccion.interface';
import { RecoleccionMockService } from './services/recoleccion-mock.service';

@Component({ selector: 'app-recolecciones', standalone: true, imports: [ReactiveFormsModule, RecoleccionModal], templateUrl: './recolecciones.html', styleUrl: './recolecciones.css' })
export class Recolecciones implements OnInit {
  recolecciones: Recoleccion[] = [];
  recoleccionesFiltradas: Recoleccion[] = [];
  filtroForm: FormGroup;
  mostrarModal = false;
  recoleccionSeleccionada: Recoleccion | null = null;

  constructor(private fb: FormBuilder, private recoleccionService: RecoleccionMockService, private toastService: ToastService) { this.filtroForm = this.fb.group({ busqueda: [''], estadoSeleccionado: [''] }); }
  ngOnInit(): void { this.actualizarListado(); this.filtroForm.valueChanges.subscribe(() => this.filtrarRecolecciones()); }
  abrirModal(): void { this.recoleccionSeleccionada = null; this.mostrarModal = true; }
  cerrarModal(): void { this.mostrarModal = false; this.recoleccionSeleccionada = null; }
  editarRecoleccion(recoleccion: Recoleccion): void { this.recoleccionSeleccionada = { ...recoleccion }; this.mostrarModal = true; }

  eliminarRecoleccion(recoleccion: Recoleccion): void {
    if (confirm(`¿Está seguro de eliminar la recolección de ${recoleccion.cliente}? Esta acción no se puede deshacer.`) && this.recoleccionService.eliminarRecoleccion(recoleccion.id)) {
      this.actualizarListado();
      this.toastService.danger('Recolección eliminada correctamente');
    }
  }

  guardarRecoleccion(recoleccion: Omit<Recoleccion, 'id'>): void {
    if (this.recoleccionSeleccionada) {
      this.recoleccionService.actualizarRecoleccion(this.recoleccionSeleccionada.id, recoleccion);
      this.toastService.info('Recolección actualizada correctamente');
    } else {
      this.recoleccionService.crearRecoleccion(recoleccion);
      this.toastService.success('Recolección creada correctamente');
    }
    this.cerrarModal();
    this.actualizarListado();
  }

  filtrarRecolecciones(): void {
    const termino = (this.filtroForm.get('busqueda')?.value ?? '').toLowerCase().trim();
    const estadoSeleccionado = this.filtroForm.get('estadoSeleccionado')?.value ?? '';
    this.recoleccionesFiltradas = this.recolecciones.filter(recoleccion => {
      const coincideBusqueda = !termino || [recoleccion.cliente, recoleccion.operador, recoleccion.vehiculo].some(valor => valor.toLowerCase().includes(termino));
      return coincideBusqueda && (!estadoSeleccionado || recoleccion.estado === estadoSeleccionado);
    });
  }

  claseEstado(estado: string): string {
    return estado === 'Completada' ? 'bg-success' : estado === 'Cancelada' ? 'bg-danger' : 'bg-warning text-dark';
  }

  private actualizarListado(): void { this.recolecciones = this.recoleccionService.getRecolecciones(); this.filtrarRecolecciones(); }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { IncidenciaModal } from './components/incidencia-modal/incidencia-modal';
import { Incidencia } from './interfaces/incidencia.interface';
import { IncidenciaService } from './services/incidencia.service';
import { Subscription } from 'rxjs';

@Component({ selector: 'app-incidencias', standalone: true, imports: [ReactiveFormsModule, IncidenciaModal], templateUrl: './incidencias.html', styleUrl: './incidencias.css' })
export class Incidencias implements OnInit {
  incidencias: Incidencia[] = [];
  incidenciasFiltradas: Incidencia[] = [];
  filtroForm: FormGroup;
  mostrarModal = false;
  incidenciaSeleccionada: Incidencia | null = null;
  private actualizarListadoSub!: Subscription;

  constructor(private fb: FormBuilder, private incidenciaService: IncidenciaService, private toastService: ToastService) { this.filtroForm = this.fb.group({ busqueda: [''], prioridadSeleccionada: [''] }); }
  ngOnInit(): void { this.actualizarListado(); this.filtroForm.valueChanges.subscribe(() => this.filtrarIncidencias()); }
  abrirModal(): void { this.incidenciaSeleccionada = null; this.mostrarModal = true; }
  cerrarModal(): void { this.mostrarModal = false; this.incidenciaSeleccionada = null; }
  editarIncidencia(incidencia: Incidencia): void { this.incidenciaSeleccionada = { ...incidencia }; this.mostrarModal = true; }

  eliminarIncidencia(incidencia: Incidencia): void {
    if (confirm(`¿Está seguro de eliminar la incidencia ${incidencia.titulo}? Esta acción no se puede deshacer.`) && this.incidenciaService.delete(incidencia.id)) {
      this.actualizarListado();
      this.toastService.danger('Incidencia eliminada correctamente');
    }
  }

  guardarIncidencia(incidencia: Omit<Incidencia, 'id'>): void {
    if (this.incidenciaSeleccionada) {
      this.incidenciaService.update(this.incidenciaSeleccionada.id, incidencia);
      this.toastService.info('Incidencia actualizada correctamente');
    } else {
      this.incidenciaService.create(incidencia);
      this.toastService.success('Incidencia creada correctamente');
    }
    this.cerrarModal();
    this.actualizarListado();
  }

  filtrarIncidencias(): void {
    const termino = (this.filtroForm.get('busqueda')?.value ?? '').toLowerCase().trim();
    const prioridadSeleccionada = this.filtroForm.get('prioridadSeleccionada')?.value ?? '';
    this.incidenciasFiltradas = this.incidencias.filter(incidencia => {
      const coincideBusqueda = !termino || [incidencia.titulo, incidencia.descripcion, incidencia.responsable].some(valor => valor.toLowerCase().includes(termino));
      return coincideBusqueda && (!prioridadSeleccionada || incidencia.prioridad === prioridadSeleccionada);
    });
  }

  clasePrioridad(prioridad: string): string { return prioridad === 'Alta' ? 'bg-danger' : prioridad === 'Media' ? 'bg-warning text-dark' : 'bg-success'; }
  private actualizarListado(): void {
    this.actualizarListadoSub = this.incidenciaService.getAll().subscribe(data => {
      this.incidencias = data;
      this.filtrarIncidencias();
    });
  }

  ngOnDestroy(): void {
    if (this.actualizarListadoSub) {
      this.actualizarListadoSub.unsubscribe();
    }
  }

}

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Incidencia } from '../../interfaces/incidencia.interface';
import { IncidenciaForm } from '../incidencia-form/incidencia-form';

@Component({ selector: 'app-incidencia-modal', standalone: true, imports: [IncidenciaForm], templateUrl: './incidencia-modal.html', styleUrl: './incidencia-modal.css' })
export class IncidenciaModal {
  @ViewChild(IncidenciaForm) incidenciaFormComponent?: IncidenciaForm;
  @Input() incidenciaEditar: Incidencia | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Omit<Incidencia, 'id'>>();
  cerrarModal(): void { if (this.incidenciaFormComponent?.incidenciaForm.dirty && !confirm('¿Desea salir sin guardar los cambios?')) return; this.cerrar.emit(); }
  guardarIncidencia(incidencia: Omit<Incidencia, 'id'>): void { this.guardar.emit(incidencia); }
}

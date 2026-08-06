import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Recoleccion, RecoleccionRequest } from '../../interfaces/recoleccion.interface';
import { RecoleccionForm } from '../recoleccion-form/recoleccion-form';

@Component({ selector: 'app-recoleccion-modal', standalone: true, imports: [RecoleccionForm], templateUrl: './recoleccion-modal.html', styleUrl: './recoleccion-modal.css' })
export class RecoleccionModal {
  @ViewChild(RecoleccionForm) recoleccionFormComponent?: RecoleccionForm;
  @Input() recoleccionEditar: Recoleccion | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<RecoleccionRequest>();
  cerrarModal(): void { if (this.recoleccionFormComponent?.recoleccionForm.dirty && !confirm('¿Desea salir sin guardar los cambios?')) return; this.cerrar.emit(); }
  guardarRecoleccion(recoleccion: RecoleccionRequest): void { this.guardar.emit(recoleccion); }
}

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Ruta } from '../../interfaces/ruta.interface';
import { RutaForm } from '../ruta-form/ruta-form';

@Component({ selector: 'app-ruta-modal', standalone: true, imports: [RutaForm], templateUrl: './ruta-modal.html', styleUrl: './ruta-modal.css' })
export class RutaModal {
  @ViewChild(RutaForm) rutaFormComponent?: RutaForm;
  @Input() rutaEditar: Ruta | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Omit<Ruta, 'id'>>();
  cerrarModal(): void { if (this.rutaFormComponent?.rutaForm.dirty && !confirm('¿Desea salir sin guardar los cambios?')) return; this.cerrar.emit(); }
  guardarRuta(ruta: Omit<Ruta, 'id'>): void { this.guardar.emit(ruta); }
}

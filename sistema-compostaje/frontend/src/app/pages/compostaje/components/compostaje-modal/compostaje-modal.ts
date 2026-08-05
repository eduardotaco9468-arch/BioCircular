import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Compostaje } from '../../interfaces/compostaje.interface';
import { CompostajeForm } from '../compostaje-form/compostaje-form';

@Component({ selector: 'app-compostaje-modal', standalone: true, imports: [CompostajeForm], templateUrl: './compostaje-modal.html', styleUrl: './compostaje-modal.css' })
export class CompostajeModal {
  @ViewChild(CompostajeForm) compostajeFormComponent?: CompostajeForm;
  @Input() compostajeEditar: Compostaje | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Omit<Compostaje, 'id'>>();
  cerrarModal(): void { if (this.compostajeFormComponent?.compostajeForm.dirty && !confirm('¿Desea salir sin guardar los cambios?')) return; this.cerrar.emit(); }
  guardarCompostaje(registro: Omit<Compostaje, 'id'>): void { this.guardar.emit(registro); }
}

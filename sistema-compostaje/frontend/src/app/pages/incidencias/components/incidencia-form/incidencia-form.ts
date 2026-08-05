import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Incidencia } from '../../interfaces/incidencia.interface';

@Component({ selector: 'app-incidencia-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './incidencia-form.html', styleUrl: './incidencia-form.css' })
export class IncidenciaForm implements OnChanges {
  @Input() incidenciaEditar: Incidencia | null = null;
  @Output() guardarIncidencia = new EventEmitter<Omit<Incidencia, 'id'>>();
  @Output() cancelar = new EventEmitter<void>();
  incidenciaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.incidenciaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(150)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      prioridad: ['Media', Validators.required],
      estado: ['Abierta', Validators.required],
      responsable: ['', [Validators.required, Validators.maxLength(100)]],
      fecha: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incidenciaEditar']) this.incidenciaEditar ? this.incidenciaForm.patchValue(this.incidenciaEditar) : this.reiniciarFormulario();
  }

  guardar(): void {
    if (this.incidenciaForm.invalid) { this.incidenciaForm.markAllAsTouched(); return; }
    this.guardarIncidencia.emit(this.incidenciaForm.value);
    this.reiniciarFormulario();
  }

  private reiniciarFormulario(): void { this.incidenciaForm.reset({ prioridad: 'Media', estado: 'Abierta' }); }
  cancelarFormulario(): void { this.cancelar.emit(); }
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ruta } from '../../interfaces/ruta.interface';

@Component({ selector: 'app-ruta-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './ruta-form.html', styleUrl: './ruta-form.css' })
export class RutaForm implements OnChanges {
  @Input() rutaEditar: Ruta | null = null;
  @Output() guardarRuta = new EventEmitter<Omit<Ruta, 'id'>>();
  @Output() cancelar = new EventEmitter<void>();
  rutaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rutaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      sector: ['', [Validators.required, Validators.maxLength(100)]],
      operador: ['', [Validators.required, Validators.maxLength(100)]],
      horario: ['', [Validators.required, Validators.maxLength(50)]],
      estado: [true]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rutaEditar']) this.rutaEditar ? this.rutaForm.patchValue(this.rutaEditar) : this.reiniciarFormulario();
  }

  guardar(): void {
    if (this.rutaForm.invalid) { this.rutaForm.markAllAsTouched(); return; }
    this.guardarRuta.emit(this.rutaForm.value);
    this.reiniciarFormulario();
  }

  private reiniciarFormulario(): void { this.rutaForm.reset({ estado: true }); }
  cancelarFormulario(): void { this.cancelar.emit(); }
}

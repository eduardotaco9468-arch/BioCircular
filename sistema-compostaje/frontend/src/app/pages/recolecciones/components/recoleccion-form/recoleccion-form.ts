import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recoleccion } from '../../interfaces/recoleccion.interface';

@Component({ selector: 'app-recoleccion-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './recoleccion-form.html', styleUrl: './recoleccion-form.css' })
export class RecoleccionForm implements OnChanges {
  @Input() recoleccionEditar: Recoleccion | null = null;
  @Output() guardarRecoleccion = new EventEmitter<Omit<Recoleccion, 'id'>>();
  @Output() cancelar = new EventEmitter<void>();
  recoleccionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recoleccionForm = this.fb.group({
      cliente: ['', [Validators.required, Validators.maxLength(100)]],
      operador: ['', [Validators.required, Validators.maxLength(100)]],
      vehiculo: ['', [Validators.required, Validators.maxLength(30)]],
      fecha: ['', Validators.required], peso: ['', [Validators.required, Validators.min(0.01)]],
      estado: ['Pendiente', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recoleccionEditar']) {
      this.recoleccionEditar ? this.recoleccionForm.patchValue(this.recoleccionEditar) : this.reiniciarFormulario();
    }
  }

  guardar(): void {
    if (this.recoleccionForm.invalid) { this.recoleccionForm.markAllAsTouched(); return; }
    this.guardarRecoleccion.emit({ ...this.recoleccionForm.value, peso: Number(this.recoleccionForm.value.peso) });
    this.reiniciarFormulario();
  }

  private reiniciarFormulario(): void { this.recoleccionForm.reset({ estado: 'Pendiente' }); }
  cancelarFormulario(): void { this.cancelar.emit(); }
}

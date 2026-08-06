import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recoleccion, RecoleccionRequest } from '../../interfaces/recoleccion.interface';

@Component({ selector: 'app-recoleccion-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './recoleccion-form.html', styleUrl: './recoleccion-form.css' })
export class RecoleccionForm implements OnChanges {
  @Input() recoleccionEditar: Recoleccion | null = null;
  @Output() guardarRecoleccion = new EventEmitter<RecoleccionRequest>();
  @Output() cancelar = new EventEmitter<void>();
  readonly recoleccionForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.recoleccionForm = this.fb.group({
      clienteId: [null, Validators.required], operadorId: [null], vehiculoId: [null],
      fechaProgramada: ['', Validators.required], fechaRealizada: [''], estado: ['PENDIENTE', Validators.required],
      pesoRecolectado: [null, [Validators.required, Validators.min(0.01)]], unidad: ['KILOGRAMOS', Validators.required], observaciones: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['recoleccionEditar']) return;
    this.recoleccionEditar ? this.recoleccionForm.patchValue(this.recoleccionEditar) : 
    this.recoleccionForm.reset({ 
      estado: 'PENDIENTE', 
      unidad: 'KILOGRAMOS',
      clienteId: null,
      operadorId: null,
      vehiculoId: null,
      fechaProgramada: '',
      fechaRealizada: '',
      pesoRecolectado: null,
      observaciones: ''
    });
  }

  guardar(): void {
    if (this.recoleccionForm.invalid) { this.recoleccionForm.markAllAsTouched(); return; }
    const valor = this.recoleccionForm.getRawValue();
    this.guardarRecoleccion.emit({
      ...valor, clienteId: Number(valor.clienteId), operadorId: valor.operadorId ? Number(valor.operadorId) : null,
      vehiculoId: valor.vehiculoId ? Number(valor.vehiculoId) : null,
      pesoRecolectado: valor.pesoRecolectado ? Number(valor.pesoRecolectado) : null,
      fechaRealizada: valor.fechaRealizada || null, observaciones: valor.observaciones || null
    });
  }

  campoInvalido(campo: string): boolean { const control = this.recoleccionForm.get(campo); return !!control && control.invalid && control.touched; }
}

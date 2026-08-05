import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Vehiculo } from '../../models/vehiculo.model';
@Component({ selector: 'app-vehiculo-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './vehiculo-form.component.html' })
export class VehiculoFormComponent implements OnChanges {
  @Input() vehiculo: Vehiculo | null = null; @Output() guardarVehiculo = new EventEmitter<Omit<Vehiculo, 'id'>>(); @Output() cancelar = new EventEmitter<void>();
  readonly formulario: FormGroup;
  constructor(private fb: FormBuilder) { this.formulario = this.fb.group({ placa: ['', Validators.required], tipo: ['', Validators.required], estado: ['Disponible', Validators.required] }); }
  ngOnChanges(changes: SimpleChanges): void { if (changes['vehiculo']) this.vehiculo ? this.formulario.patchValue(this.vehiculo) : this.formulario.reset({ estado: 'Disponible' }); }
  guardar(): void { if (this.formulario.invalid) { this.formulario.markAllAsTouched(); return; } this.guardarVehiculo.emit(this.formulario.getRawValue() as Omit<Vehiculo, 'id'>); }
}

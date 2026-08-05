import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contenedor } from '../../models/contenedor.model';

@Component({ selector: 'app-contenedor-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './contenedor-form.component.html' })
export class ContenedorFormComponent implements OnChanges {
  @Input() contenedor: Contenedor | null = null;
  @Output() guardarContenedor = new EventEmitter<Omit<Contenedor, 'id'>>();
  @Output() cancelar = new EventEmitter<void>();
  readonly formulario: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({ codigo: ['', Validators.required], capacidad: [null as number | null, [Validators.required, Validators.min(1)]], estado: ['Disponible', Validators.required] });
  }
  ngOnChanges(changes: SimpleChanges): void { if (changes['contenedor']) this.contenedor ? this.formulario.patchValue(this.contenedor) : this.formulario.reset({ estado: 'Disponible' }); }
  guardar(): void { if (this.formulario.invalid) { this.formulario.markAllAsTouched(); return; } this.guardarContenedor.emit(this.formulario.getRawValue() as Omit<Contenedor, 'id'>); }
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Compostaje } from '../../interfaces/compostaje.interface';

@Component({ selector: 'app-compostaje-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './compostaje-form.html', styleUrl: './compostaje-form.css' })
export class CompostajeForm implements OnChanges {
  @Input() compostajeEditar: Compostaje | null = null;
  @Output() guardarCompostaje = new EventEmitter<Omit<Compostaje, 'id'>>();
  @Output() cancelar = new EventEmitter<void>();
  compostajeForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.compostajeForm = this.fb.group({
      lote: ['', [Validators.required, Validators.maxLength(50)]], proceso: ['Descomposición', Validators.required],
      temperatura: ['', [Validators.required, Validators.min(0)]], humedad: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      estado: ['Activo', Validators.required], observaciones: ['', Validators.maxLength(500)]
    });
  }
  ngOnChanges(changes: SimpleChanges): void { if (changes['compostajeEditar']) this.compostajeEditar ? this.compostajeForm.patchValue(this.compostajeEditar) : this.reiniciarFormulario(); }
  guardar(): void { if (this.compostajeForm.invalid) { this.compostajeForm.markAllAsTouched(); return; } this.guardarCompostaje.emit({ ...this.compostajeForm.value, temperatura: Number(this.compostajeForm.value.temperatura), humedad: Number(this.compostajeForm.value.humedad) }); this.reiniciarFormulario(); }
  private reiniciarFormulario(): void { this.compostajeForm.reset({ proceso: 'Descomposición', estado: 'Activo' }); }
  cancelarFormulario(): void { this.cancelar.emit(); }
}

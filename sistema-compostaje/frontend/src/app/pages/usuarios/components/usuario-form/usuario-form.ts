import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({ selector: 'app-usuario-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './usuario-form.html', styleUrl: './usuario-form.css' })
export class UsuarioForm implements OnChanges {
  @Input() usuarioEditar: Usuario | null = null;
  @Output() guardarUsuario = new EventEmitter<Omit<Usuario, 'id'>>();
  @Output() cancelar = new EventEmitter<void>();
  usuarioForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]], correo: ['', [Validators.required, Validators.email]],
      rol: ['Operador', Validators.required], estado: [true]
    });
  }
  ngOnChanges(changes: SimpleChanges): void { if (changes['usuarioEditar']) this.usuarioEditar ? this.usuarioForm.patchValue(this.usuarioEditar) : this.reiniciarFormulario(); }
  guardar(): void { if (this.usuarioForm.invalid) { this.usuarioForm.markAllAsTouched(); return; } this.guardarUsuario.emit(this.usuarioForm.value); this.reiniciarFormulario(); }
  cancelarFormulario(): void { this.cancelar.emit(); }
  private reiniciarFormulario(): void { this.usuarioForm.reset({ rol: 'Operador', estado: true }); }
}

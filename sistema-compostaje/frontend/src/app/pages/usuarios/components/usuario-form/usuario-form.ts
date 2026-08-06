import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario.interface';
import { CrearUsuario } from '../../interfaces/crear-usuario.interface';

@Component({ selector: 'app-usuario-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './usuario-form.html', styleUrl: './usuario-form.css' })
export class UsuarioForm implements OnChanges {
  @Input() usuarioEditar: Usuario | null = null;
  @Output() guardarUsuario = new EventEmitter<CrearUsuario>();
  @Output() cancelar = new EventEmitter<void>();
  usuarioForm: FormGroup;
  constructor(private fb: FormBuilder) {
  this.usuarioForm = this.fb.group({

    nombre: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    rol: [
      'OPERADOR',
      Validators.required
    ]

  });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['usuarioEditar']) return;

    const password = this.usuarioForm.get('password');
    if (this.usuarioEditar) {
      this.usuarioForm.patchValue({ ...this.usuarioEditar, password: '' });
      password?.setValidators([Validators.minLength(6)]);
    } else {
      this.reiniciarFormulario();
      password?.setValidators([Validators.required, Validators.minLength(6)]);
    }
    password?.updateValueAndValidity();
  }

  guardar(): void { if (this.usuarioForm.invalid) { this.usuarioForm.markAllAsTouched(); return; } this.guardarUsuario.emit(this.usuarioForm.getRawValue()); }
  cancelarFormulario(): void { this.cancelar.emit(); }
  private reiniciarFormulario(): void {

    this.usuarioForm.reset({
      rol: 'OPERADOR'
    });

  }
}

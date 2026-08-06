import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css'
})
export class ClienteForm implements OnChanges {
  @Input() clienteEditar: Cliente | null = null;
  @Output() guardarCliente = new EventEmitter<Omit<Cliente, 'id'>>();
  @Output() cancelar = new EventEmitter<void>();

  clienteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$/)]],
      tipoCliente: ['Residencial', Validators.required],
      identificacion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      direccion: ['', Validators.required],
      sector: ['', Validators.required],
      estado: [true]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clienteEditar']) {
      this.clienteEditar ? this.clienteForm.patchValue(this.clienteEditar) : this.reiniciarFormulario();
    }
  }

  guardar(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }
    this.guardarCliente.emit(this.clienteForm.getRawValue());
    this.reiniciarFormulario();
  }

  campoInvalido(campo: string): boolean {
    const control = this.clienteForm.get(campo);
    return !!control && control.invalid && control.touched;
  }

  cancelarFormulario(): void { this.cancelar.emit(); }

  private reiniciarFormulario(): void {
    this.clienteForm.reset({ tipoCliente: 'Residencial', estado: true });
  }
}

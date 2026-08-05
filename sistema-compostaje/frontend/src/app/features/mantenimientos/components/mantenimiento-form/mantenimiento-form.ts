import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MantenimientoService } from '../../services/mantenimiento.service';

@Component({ selector: 'app-mantenimiento-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './mantenimiento-form.html', styleUrl: './mantenimiento-form.css' })
export class MantenimientoForm {
  mantenimientoForm: FormGroup;
  constructor(private fb: FormBuilder, private mantenimientoService: MantenimientoService, private router: Router) {
    this.mantenimientoForm = this.fb.group({ vehiculoId: [null, Validators.required], fecha: ['', Validators.required], tipo: ['', Validators.required], descripcion: ['', [Validators.required, Validators.minLength(10)]], costo: [null, [Validators.required, Validators.min(0.01)]], estado: ['', Validators.required] });
  }
  guardar(): void {
    if (this.mantenimientoForm.invalid) { this.mantenimientoForm.markAllAsTouched(); return; }
    this.mantenimientoService.crear(this.mantenimientoForm.getRawValue());
    this.router.navigate(['/mantenimientos']);
  }
  campoInvalido(campo: string): boolean { const control = this.mantenimientoForm.get(campo); return !!control && control.invalid && control.touched; }
}

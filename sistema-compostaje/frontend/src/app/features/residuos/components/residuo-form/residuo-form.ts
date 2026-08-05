import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Residuo } from '../../models/residuo.model';
import { ResiduoService } from '../../services/residuo.service';

@Component({ selector: 'app-residuo-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './residuo-form.html', styleUrl: './residuo-form.css' })
export class ResiduoForm implements OnInit {
  residuoForm: FormGroup; private residuoEditar: Residuo | null = null;
  constructor(private fb: FormBuilder, private residuoService: ResiduoService, private router: Router) { this.residuoForm = this.fb.group({ nombre: ['', [Validators.required, Validators.minLength(3)]], descripcion: ['', Validators.required], tipo: ['', Validators.required], estado: ['', Validators.required] }); }
  ngOnInit(): void { const estado = history.state.residuo as Residuo | undefined; if (estado) { this.residuoEditar = estado; this.residuoForm.patchValue(estado); } }
  guardar(): void { if (this.residuoForm.invalid) { this.residuoForm.markAllAsTouched(); return; } const datos = this.residuoForm.getRawValue() as Omit<Residuo, 'id'>; this.residuoEditar ? this.residuoService.actualizar(this.residuoEditar.id, datos) : this.residuoService.crear(datos); this.router.navigate(['/residuos']); }
  campoInvalido(campo: string): boolean { const control = this.residuoForm.get(campo); return !!control && control.invalid && control.touched; }
}

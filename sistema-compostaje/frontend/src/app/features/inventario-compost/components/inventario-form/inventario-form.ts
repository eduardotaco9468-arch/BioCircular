import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventarioCompost } from '../../models/inventario-compost.model';
import { InventarioCompostService } from '../../services/inventario-compost.service';
@Component({ selector: 'app-inventario-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './inventario-form.html', styleUrl: './inventario-form.css' })
export class InventarioForm implements OnInit {
  inventarioForm: FormGroup; private registroEditar: InventarioCompost | null = null;
  constructor(private fb: FormBuilder, private inventarioService: InventarioCompostService, private router: Router) { this.inventarioForm = this.fb.group({ lote: ['', [Validators.required, Validators.minLength(3)]], fechaProduccion: ['', Validators.required], cantidad: [null, [Validators.required, Validators.min(0.01)]], unidad: ['', Validators.required], estado: ['', Validators.required], ubicacion: ['', Validators.required] }); }
  ngOnInit(): void { const registro = history.state.registro as InventarioCompost | undefined; if (registro) { this.registroEditar = registro; this.inventarioForm.patchValue({ ...registro, fechaProduccion: new Date(registro.fechaProduccion).toISOString().slice(0, 10) }); } }
  guardar(): void { if (this.inventarioForm.invalid) { this.inventarioForm.markAllAsTouched(); return; } const valor = this.inventarioForm.getRawValue(); const datos = { ...valor, fechaProduccion: new Date(valor.fechaProduccion) } as Omit<InventarioCompost, 'id'>; this.registroEditar ? this.inventarioService.actualizar(this.registroEditar.id, datos) : this.inventarioService.crear(datos); this.router.navigate(['/inventario-compost']); }
  campoInvalido(campo: string): boolean { const control = this.inventarioForm.get(campo); return !!control && control.invalid && control.touched; }
}

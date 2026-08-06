import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehiculoFormComponent } from '../vehiculo-form/vehiculo-form.component';
import { VehiculoDetailComponent } from '../vehiculo-detail/vehiculo-detail.component';
import { Vehiculo } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/vehiculo.service';
import { Subscription } from 'rxjs';
@Component({ selector: 'app-vehiculo-list', standalone: true, imports: [VehiculoFormComponent, VehiculoDetailComponent], templateUrl: './vehiculo-list.component.html' })
export class VehiculoListComponent implements OnInit {
  vehiculos: Vehiculo[] = []; mostrarFormulario = false; vehiculoSeleccionado: Vehiculo | null = null; vehiculoDetalle: Vehiculo | null = null;
  private cargarSub!: Subscription;
  constructor(private vehiculoService: VehiculoService) {}
  ngOnInit(): void { this.cargar(); }
  editar(vehiculo: Vehiculo): void { this.vehiculoSeleccionado = vehiculo; this.mostrarFormulario = true; }
  guardar(datos: Omit<Vehiculo, 'id'>): void {
    if (this.vehiculoSeleccionado) {
      this.vehiculoService.actualizar(this.vehiculoSeleccionado.id, datos).subscribe();
    } else {
      this.vehiculoService.crear(datos).subscribe();
    }
    this.cerrarFormulario();
    this.cargar();
  }
  eliminar(id: number): void { this.vehiculoService.eliminar(id).subscribe(); if (this.vehiculoDetalle?.id === id) this.vehiculoDetalle = null; this.cargar(); }
  cerrarFormulario(): void { this.mostrarFormulario = false; this.vehiculoSeleccionado = null; }
  private cargar(): void {
    this.cargarSub = this.vehiculoService.obtenerTodos().subscribe(data => {
      this.vehiculos = data;
    });
  }

  ngOnDestroy(): void {
    if (this.cargarSub) {
      this.cargarSub.unsubscribe();
    }
  }

}

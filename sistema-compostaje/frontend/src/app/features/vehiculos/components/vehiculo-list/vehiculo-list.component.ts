import { Component, OnInit } from '@angular/core';
import { VehiculoFormComponent } from '../vehiculo-form/vehiculo-form.component';
import { VehiculoDetailComponent } from '../vehiculo-detail/vehiculo-detail.component';
import { Vehiculo } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/vehiculo.service';
@Component({ selector: 'app-vehiculo-list', standalone: true, imports: [VehiculoFormComponent, VehiculoDetailComponent], templateUrl: './vehiculo-list.component.html' })
export class VehiculoListComponent implements OnInit {
  vehiculos: Vehiculo[] = []; mostrarFormulario = false; vehiculoSeleccionado: Vehiculo | null = null; vehiculoDetalle: Vehiculo | null = null;
  constructor(private vehiculoService: VehiculoService) {}
  ngOnInit(): void { this.cargar(); }
  editar(vehiculo: Vehiculo): void { this.vehiculoSeleccionado = vehiculo; this.mostrarFormulario = true; }
  guardar(datos: Omit<Vehiculo, 'id'>): void { this.vehiculoSeleccionado ? this.vehiculoService.actualizar(this.vehiculoSeleccionado.id, datos) : this.vehiculoService.crear(datos); this.cerrarFormulario(); this.cargar(); }
  eliminar(id: number): void { this.vehiculoService.eliminar(id); if (this.vehiculoDetalle?.id === id) this.vehiculoDetalle = null; this.cargar(); }
  cerrarFormulario(): void { this.mostrarFormulario = false; this.vehiculoSeleccionado = null; }
  private cargar(): void { this.vehiculos = this.vehiculoService.obtenerTodos(); }
}

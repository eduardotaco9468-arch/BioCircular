import { Component, OnInit } from '@angular/core';
import { ContenedorFormComponent } from '../contenedor-form/contenedor-form.component';
import { Contenedor } from '../../models/contenedor.model';
import { ContenedorService } from '../../services/contenedor.service';

@Component({ selector: 'app-contenedor-list', standalone: true, imports: [ContenedorFormComponent], templateUrl: './contenedor-list.component.html' })
export class ContenedorListComponent implements OnInit {
  contenedores: Contenedor[] = []; mostrarFormulario = false; contenedorSeleccionado: Contenedor | null = null;
  constructor(private contenedorService: ContenedorService) {}
  ngOnInit(): void { this.cargar(); }
  editar(contenedor: Contenedor): void { this.contenedorSeleccionado = contenedor; this.mostrarFormulario = true; }
  guardar(datos: Omit<Contenedor, 'id'>): void { this.contenedorSeleccionado ? this.contenedorService.actualizar(this.contenedorSeleccionado.id, datos) : this.contenedorService.crear(datos); this.cerrarFormulario(); this.cargar(); }
  eliminar(id: number): void { this.contenedorService.eliminar(id); this.cargar(); }
  cerrarFormulario(): void { this.mostrarFormulario = false; this.contenedorSeleccionado = null; }
  private cargar(): void { this.contenedores = this.contenedorService.obtenerTodos(); }
}

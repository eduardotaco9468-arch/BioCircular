import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContenedorFormComponent } from '../contenedor-form/contenedor-form.component';
import { Contenedor } from '../../models/contenedor.model';
import { ContenedorService } from '../../services/contenedor.service';
import { Subscription } from 'rxjs';

@Component({ selector: 'app-contenedor-list', standalone: true, imports: [ContenedorFormComponent], templateUrl: './contenedor-list.component.html' })
export class ContenedorListComponent implements OnInit {
  contenedores: Contenedor[] = []; mostrarFormulario = false; contenedorSeleccionado: Contenedor | null = null;
  private cargarSub!: Subscription;
  constructor(private contenedorService: ContenedorService) {}
  ngOnInit(): void { this.cargar(); }
  editar(contenedor: Contenedor): void { this.contenedorSeleccionado = contenedor; this.mostrarFormulario = true; }
  guardar(datos: Omit<Contenedor, 'id'>): void {
    if (this.contenedorSeleccionado) {
      this.contenedorService.actualizar(this.contenedorSeleccionado.id, datos).subscribe();
    } else {
      this.contenedorService.crear(datos).subscribe();
    }
    this.cerrarFormulario();
    this.cargar();
  }
  eliminar(id: number): void { this.contenedorService.eliminar(id).subscribe(); this.cargar(); }
  cerrarFormulario(): void { this.mostrarFormulario = false; this.contenedorSeleccionado = null; }
  private cargar(): void {
    this.cargarSub = this.contenedorService.obtenerTodos().subscribe(data => {
      this.contenedores = data;
    });
  }

  ngOnDestroy(): void {
    if (this.cargarSub) {
      this.cargarSub.unsubscribe();
    }
  }

}

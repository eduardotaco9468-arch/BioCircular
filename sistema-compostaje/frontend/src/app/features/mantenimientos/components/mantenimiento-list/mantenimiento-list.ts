import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Mantenimiento } from '../../models/mantenimiento.model';
import { MantenimientoService } from '../../services/mantenimiento.service';

@Component({
  selector: 'app-mantenimiento-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mantenimiento-list.html',
  styleUrl: './mantenimiento-list.css'
})
export class MantenimientoList implements OnInit {
  mantenimientos: Mantenimiento[] = [];

  constructor(private mantenimientoService: MantenimientoService) {}

  ngOnInit(): void { this.cargarMantenimientos(); }
  cargarMantenimientos(): void { this.mantenimientos = this.mantenimientoService.obtenerTodos(); }
  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este mantenimiento?')) {
      this.mantenimientoService.eliminar(id);
      this.cargarMantenimientos();
    }
  }
}

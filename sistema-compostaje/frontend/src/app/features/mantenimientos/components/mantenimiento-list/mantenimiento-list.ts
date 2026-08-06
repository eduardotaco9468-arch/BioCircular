import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Mantenimiento } from '../../models/mantenimiento.model';
import { MantenimientoService } from '../../services/mantenimiento.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mantenimiento-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mantenimiento-list.html',
  styleUrl: './mantenimiento-list.css'
})
export class MantenimientoList implements OnInit {
  mantenimientos: Mantenimiento[] = [];
  private cargarSub!: Subscription;

  constructor(private mantenimientoService: MantenimientoService) {}

  ngOnInit(): void { this.cargarMantenimientos(); }
  cargarMantenimientos(): void {
    this.cargarSub = this.mantenimientoService.obtenerTodos().subscribe(data => {
      this.mantenimientos = data;
    });
  }
  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este mantenimiento?')) {
      this.mantenimientoService.eliminar(id).subscribe()
      this.cargarMantenimientos();
    }
  }

  ngOnDestroy(): void {
    if (this.cargarSub) {
      this.cargarSub.unsubscribe();
    }
  }

}

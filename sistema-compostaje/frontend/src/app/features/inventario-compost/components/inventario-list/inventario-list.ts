import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InventarioCompost } from '../../models/inventario-compost.model';
import { InventarioCompostService } from '../../services/inventario-compost.service';
import { Subscription } from 'rxjs';
@Component({ selector: 'app-inventario-list', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './inventario-list.html', styleUrl: './inventario-list.css' })
export class InventarioList implements OnInit {
  registros: InventarioCompost[] = [];
  private cargarSub!: Subscription;
  constructor(private inventarioService: InventarioCompostService, private router: Router) {}
  ngOnInit(): void { this.cargarRegistros(); }
  cargarRegistros(): void {
    this.cargarSub = this.inventarioService.obtenerTodos().subscribe(data => {
      this.registros = data;
    });
  }
  editar(registro: InventarioCompost): void { this.router.navigate(['/inventario-compost/nuevo'], { state: { registro } }); }
  eliminar(id: number): void { if (confirm('¿Está seguro de eliminar este registro?')) { this.inventarioService.eliminar(id).subscribe(); this.cargarRegistros(); } }

  ngOnDestroy(): void {
    if (this.cargarSub) {
      this.cargarSub.unsubscribe();
    }
  }

}

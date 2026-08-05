import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InventarioCompost } from '../../models/inventario-compost.model';
import { InventarioCompostService } from '../../services/inventario-compost.service';
@Component({ selector: 'app-inventario-list', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './inventario-list.html', styleUrl: './inventario-list.css' })
export class InventarioList implements OnInit {
  registros: InventarioCompost[] = [];
  constructor(private inventarioService: InventarioCompostService, private router: Router) {}
  ngOnInit(): void { this.cargarRegistros(); }
  cargarRegistros(): void { this.registros = this.inventarioService.obtenerTodos(); }
  editar(registro: InventarioCompost): void { this.router.navigate(['/inventario-compost/nuevo'], { state: { registro } }); }
  eliminar(id: number): void { if (confirm('¿Está seguro de eliminar este registro?')) { this.inventarioService.eliminar(id); this.cargarRegistros(); } }
}

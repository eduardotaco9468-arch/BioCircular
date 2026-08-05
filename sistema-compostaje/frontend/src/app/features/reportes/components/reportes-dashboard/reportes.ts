import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Reporte, ReporteCompost, ReporteIncidencia, ReporteRecoleccion } from '../../models/reporte.model';
import { ReporteService } from '../../services/reporte.service';
@Component({ selector: 'app-reportes', standalone: true, imports: [CommonModule], templateUrl: './reportes.html', styleUrl: './reportes.css' })
export class Reportes implements OnInit {
  resumen: Reporte[] = []; recolecciones: ReporteRecoleccion[] = []; compost: ReporteCompost[] = []; incidencias: ReporteIncidencia[] = [];
  constructor(private reporteService: ReporteService) {}
  ngOnInit(): void { this.resumen = this.reporteService.obtenerResumen(); this.recolecciones = this.reporteService.obtenerEstadisticasRecoleccion(); this.compost = this.reporteService.obtenerEstadisticasCompost(); this.incidencias = this.reporteService.obtenerIncidencias(); }
  icono(tipo: string): string { return ({ Clientes: 'bi-people', Recolecciones: 'bi-truck', Incidencias: 'bi-exclamation-triangle', Compost: 'bi-flower1' } as Record<string, string>)[tipo] ?? 'bi-bar-chart'; }
}

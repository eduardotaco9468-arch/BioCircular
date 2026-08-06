import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reporte, ReporteCompost, ReporteIncidencia, ReporteRecoleccion } from '../../models/reporte.model';
import { ReporteService } from '../../services/reporte.service';
@Component({ selector: 'app-reportes', standalone: true, imports: [CommonModule], templateUrl: './reportes.html', styleUrl: './reportes.css' })
export class Reportes implements OnInit, OnDestroy {
  resumen: Reporte[] = []; recolecciones: ReporteRecoleccion[] = []; compost: ReporteCompost[] = []; incidencias: ReporteIncidencia[] = [];
  private resumenSub!: Subscription;
  private recoleccionesSub!: Subscription;
  private compostSub!: Subscription;
  private incidenciasSub!: Subscription;
  constructor(private reporteService: ReporteService) {}
  ngOnInit(): void {
    this.resumenSub = this.reporteService.obtenerResumen().subscribe(data => {
      this.resumen = data;
    });
    this.recoleccionesSub = this.reporteService.obtenerEstadisticasRecoleccion().subscribe(data => {
      this.recolecciones = data;
    });
    this.compostSub = this.reporteService.obtenerEstadisticasCompost().subscribe(data => {
      this.compost = data;
    });
    this.incidenciasSub = this.reporteService.obtenerIncidencias().subscribe(data => {
      this.incidencias = data;
    });
  }

  ngOnDestroy(): void {
    this.resumenSub.unsubscribe();
    this.recoleccionesSub.unsubscribe();
    this.compostSub.unsubscribe();
    this.incidenciasSub.unsubscribe();
  }

  icono(tipo: string): string { return ({ Clientes: 'bi-people', Recolecciones: 'bi-truck', Incidencias: 'bi-exclamation-triangle', Compost: 'bi-flower1' } as Record<string, string>)[tipo] ?? 'bi-bar-chart'; }
}

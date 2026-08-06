import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reporte, ReporteCompost, ReporteIncidencia, ReporteRecoleccion } from '../models/reporte.model';
import { API_BASE_URL } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private readonly apiUrl = `${API_BASE_URL}/reportes`;

  constructor(private readonly http: HttpClient) {}

  obtenerResumen(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.apiUrl}/resumen`);
  }

  obtenerEstadisticasRecoleccion(): Observable<ReporteRecoleccion[]> {
    return this.http.get<ReporteRecoleccion[]>(`${this.apiUrl}/recoleccion`);
  }

  obtenerEstadisticasCompost(): Observable<ReporteCompost[]> {
    return this.http.get<ReporteCompost[]>(`${this.apiUrl}/compost`);
  }

  obtenerIncidencias(): Observable<ReporteIncidencia[]> {
    return this.http.get<ReporteIncidencia[]>(`${this.apiUrl}/incidencias`);
  }
}

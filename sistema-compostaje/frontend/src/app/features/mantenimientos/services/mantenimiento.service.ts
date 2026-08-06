import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mantenimiento } from '../models/mantenimiento.model';
import { API_BASE_URL } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class MantenimientoService {
  private readonly apiUrl = `${API_BASE_URL}/gestion/mantenimientos`;

  constructor(private readonly http: HttpClient) {}

  obtenerTodos(): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(this.apiUrl);
  }

  getById(id: number): Observable<Mantenimiento> {
    return this.http.get<Mantenimiento>(`${this.apiUrl}/${id}`);
  }

  crear(datos: Omit<Mantenimiento, 'id'>): Observable<Mantenimiento> {
    return this.http.post<Mantenimiento>(this.apiUrl, datos);
  }

  actualizar(mantenimiento: Mantenimiento): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${mantenimiento.id}`, mantenimiento);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

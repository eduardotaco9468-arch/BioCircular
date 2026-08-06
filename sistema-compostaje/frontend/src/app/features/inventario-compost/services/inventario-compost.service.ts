import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventarioCompost } from '../models/inventario-compost.model';
import { API_BASE_URL } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class InventarioCompostService {
  private readonly apiUrl = `${API_BASE_URL}/compostaje/inventario`;

  constructor(private readonly http: HttpClient) {}

  obtenerTodos(): Observable<InventarioCompost[]> {
    return this.http.get<InventarioCompost[]>(this.apiUrl);
  }

  getById(id: number): Observable<InventarioCompost> {
    return this.http.get<InventarioCompost>(`${this.apiUrl}/${id}`);
  }

  crear(datos: Omit<InventarioCompost, 'id'>): Observable<InventarioCompost> {
    return this.http.post<InventarioCompost>(this.apiUrl, datos);
  }

  actualizar(id: number, datos: Omit<InventarioCompost, 'id'>): Observable<InventarioCompost> {
    return this.http.put<InventarioCompost>(`${this.apiUrl}/${id}`, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

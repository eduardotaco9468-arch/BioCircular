import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contenedor } from '../models/contenedor.model';
import { API_BASE_URL } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class ContenedorService {
  private readonly apiUrl = `${API_BASE_URL}/gestion/contenedores`;

  constructor(private readonly http: HttpClient) {}

  obtenerTodos(): Observable<Contenedor[]> {
    return this.http.get<Contenedor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Contenedor> {
    return this.http.get<Contenedor>(`${this.apiUrl}/${id}`);
  }

  crear(contenedor: Omit<Contenedor, 'id'>): Observable<Contenedor> {
    return this.http.post<Contenedor>(this.apiUrl, contenedor);
  }

  actualizar(id: number, contenedor: Omit<Contenedor, 'id'>): Observable<Contenedor> {
    return this.http.put<Contenedor>(`${this.apiUrl}/${id}`, contenedor);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

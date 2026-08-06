import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Residuo } from '../models/residuo.model';
import { API_BASE_URL } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class ResiduoService {
  private readonly apiUrl = `${API_BASE_URL}/compostaje/residuos`;

  constructor(private readonly http: HttpClient) {}

  obtenerTodos(): Observable<Residuo[]> {
    return this.http.get<Residuo[]>(this.apiUrl);
  }

  getById(id: number): Observable<Residuo> {
    return this.http.get<Residuo>(`${this.apiUrl}/${id}`);
  }

  crear(datos: Omit<Residuo, 'id'>): Observable<Residuo> {
    return this.http.post<Residuo>(this.apiUrl, datos);
  }

  actualizar(id: number, datos: Omit<Residuo, 'id'>): Observable<Residuo> {
    return this.http.put<Residuo>(`${this.apiUrl}/${id}`, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

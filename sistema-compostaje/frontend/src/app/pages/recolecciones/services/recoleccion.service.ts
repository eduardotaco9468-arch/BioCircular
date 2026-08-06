import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/services/api.service';
import { Recoleccion, RecoleccionRequest } from '../interfaces/recoleccion.interface';

@Injectable({ providedIn: 'root' })
export class RecoleccionService {
  private readonly apiUrl = `${API_BASE_URL}/gestion/recolecciones`;

  constructor(private readonly http: HttpClient) {}

  getRecolecciones(): Observable<Recoleccion[]> { return this.http.get<Recoleccion[]>(this.apiUrl); }
  getById(id: number): Observable<Recoleccion> { return this.http.get<Recoleccion>(`${this.apiUrl}/${id}`); }
  crear(recoleccion: RecoleccionRequest): Observable<Recoleccion> { return this.http.post<Recoleccion>(this.apiUrl, recoleccion); }
  actualizar(id: number, recoleccion: Partial<RecoleccionRequest>): Observable<Recoleccion> { return this.http.put<Recoleccion>(`${this.apiUrl}/${id}`, recoleccion); }
  eliminar(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}

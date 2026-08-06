import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private readonly apiUrl = `${API_BASE_URL}/gestion/incidencias`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(incidencia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, incidencia);
  }

  update(id: number, incidencia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, incidencia);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

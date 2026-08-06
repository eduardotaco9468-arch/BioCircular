import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class RutaService {
  private readonly apiUrl = `${API_BASE_URL}/gestion/rutas`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(ruta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ruta);
  }

  update(id: number, ruta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ruta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

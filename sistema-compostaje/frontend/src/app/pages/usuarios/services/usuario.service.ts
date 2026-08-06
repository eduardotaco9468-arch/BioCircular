import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from '../../../core/services/api.service';
import { Usuario } from '../interfaces/usuario.interface';
import { CrearUsuario } from '../interfaces/crear-usuario.interface';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly url = `${API_BASE_URL}/auth/users`;

  constructor(private readonly http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url).pipe(
      map(usuarios => usuarios.map(usuario => ({ ...usuario, estado: usuario.estado ?? true })))
    );
  }


  crearUsuario(usuario: CrearUsuario): Observable<Usuario> {

    return this.http.post<Usuario>(
      this.url,
      usuario
    );

  }

  actualizarUsuario(id: number, usuario: CrearUsuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

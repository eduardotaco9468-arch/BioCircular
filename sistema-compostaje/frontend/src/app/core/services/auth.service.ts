import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { Rol } from '../models/rol.enum';
import { LoginResponse } from '../models/login-response.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'http://localhost:8080/auth/login';
  private readonly emailKey = 'auth_email';
  private readonly rolKey = 'auth_rol';

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { email, password });
  }

  guardarSesion(respuesta: LoginResponse): void {
    this.tokenService.guardarToken(respuesta.token);
    localStorage.setItem(this.emailKey, respuesta.email);
    localStorage.setItem(this.rolKey, respuesta.rol);
  }

  obtenerUsuarioActual(): Usuario {
    return {
      id: 0,
      nombre: '',
      email: localStorage.getItem(this.emailKey) ?? '',
      rol: this.obtenerRol()
    };
  }

  obtenerRol(): Rol {
    return (localStorage.getItem(this.rolKey) ?? '') as Rol;
  }

  obtenerToken(): string | null {
    return this.tokenService.obtenerToken();
  }

  estaAutenticado(): boolean {
    return this.tokenService.tieneToken();
  }

  tieneRol(rol: Rol): boolean {
    return this.obtenerRol() === rol;
  }

  cerrarSesion(): void {
    this.tokenService.eliminarToken();
    localStorage.removeItem(this.emailKey);
    localStorage.removeItem(this.rolKey);
    this.router.navigate(['/login']);
  }
}

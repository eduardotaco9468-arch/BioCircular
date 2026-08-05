import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly tokenKey = 'auth_token';

  guardarToken(token: string): void { localStorage.setItem(this.tokenKey, token); }
  obtenerToken(): string | null { return localStorage.getItem(this.tokenKey); }
  eliminarToken(): void { localStorage.removeItem(this.tokenKey); }
  tieneToken(): boolean { return !!this.obtenerToken(); }
}

import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({ providedIn: 'root' })
export class UsuarioMockService {
  private usuarios: Usuario[] = [
    { id: 1, nombre: 'Carlos Mendoza', correo: 'carlos@biocircular.ec', rol: 'Administrador', estado: true },
    { id: 2, nombre: 'Ana Torres', correo: 'ana@biocircular.ec', rol: 'Operador', estado: true },
    { id: 3, nombre: 'Luis Vega', correo: 'luis@biocircular.ec', rol: 'Supervisor', estado: false }
  ];
  getUsuarios(): Usuario[] { return [...this.usuarios]; }
  crearUsuario(usuario: Omit<Usuario, 'id'>): Usuario { const nuevoUsuario = { id: Math.max(0, ...this.usuarios.map(item => item.id)) + 1, ...usuario }; this.usuarios.push(nuevoUsuario); return nuevoUsuario; }
  actualizarUsuario(id: number, usuario: Omit<Usuario, 'id'>): Usuario | null { const indice = this.usuarios.findIndex(item => item.id === id); if (indice === -1) return null; this.usuarios[indice] = { id, ...usuario }; return this.usuarios[indice]; }
  eliminarUsuario(id: number): boolean { const indice = this.usuarios.findIndex(item => item.id === id); if (indice === -1) return false; this.usuarios.splice(indice, 1); return true; }
}

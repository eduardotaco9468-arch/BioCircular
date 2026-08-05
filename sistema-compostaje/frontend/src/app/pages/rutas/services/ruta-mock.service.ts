import { Injectable } from '@angular/core';
import { Ruta } from '../interfaces/ruta.interface';

@Injectable({ providedIn: 'root' })
export class RutaMockService {
  private rutas: Ruta[] = [
    { id: 1, nombre: 'Ruta Centro', sector: 'Centro', operador: 'Carlos Mendoza', horario: '08:00 - 12:00', estado: true },
    { id: 2, nombre: 'Ruta Norte', sector: 'Norte', operador: 'Ana Torres', horario: '13:00 - 17:00', estado: true },
    { id: 3, nombre: 'Ruta Sur', sector: 'Sur', operador: 'Luis Vega', horario: '08:00 - 12:00', estado: false }
  ];

  getRutas(): Ruta[] { return [...this.rutas]; }

  crearRuta(ruta: Omit<Ruta, 'id'>): Ruta {
    const nuevaRuta = { id: Math.max(0, ...this.rutas.map(item => item.id)) + 1, ...ruta };
    this.rutas.push(nuevaRuta);
    return nuevaRuta;
  }

  actualizarRuta(id: number, ruta: Omit<Ruta, 'id'>): Ruta | null {
    const indice = this.rutas.findIndex(item => item.id === id);
    if (indice === -1) return null;
    this.rutas[indice] = { id, ...ruta };
    return this.rutas[indice];
  }

  eliminarRuta(id: number): boolean {
    const indice = this.rutas.findIndex(item => item.id === id);
    if (indice === -1) return false;
    this.rutas.splice(indice, 1);
    return true;
  }
}

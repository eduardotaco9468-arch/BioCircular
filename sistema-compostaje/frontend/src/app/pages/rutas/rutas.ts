import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { RutaModal } from './components/ruta-modal/ruta-modal';
import { Ruta } from './interfaces/ruta.interface';
import { RutaMockService } from './services/ruta-mock.service';

@Component({ selector: 'app-rutas', standalone: true, imports: [ReactiveFormsModule, RutaModal], templateUrl: './rutas.html', styleUrl: './rutas.css' })
export class Rutas implements OnInit {
  rutas: Ruta[] = [];
  rutasFiltradas: Ruta[] = [];
  filtroForm: FormGroup;
  mostrarModal = false;
  rutaSeleccionada: Ruta | null = null;

  constructor(private fb: FormBuilder, private rutaService: RutaMockService, private toastService: ToastService) { this.filtroForm = this.fb.group({ busqueda: [''], sectorSeleccionado: [''] }); }
  ngOnInit(): void { this.actualizarListado(); this.filtroForm.valueChanges.subscribe(() => this.filtrarRutas()); }
  abrirModal(): void { this.rutaSeleccionada = null; this.mostrarModal = true; }
  cerrarModal(): void { this.mostrarModal = false; this.rutaSeleccionada = null; }
  editarRuta(ruta: Ruta): void { this.rutaSeleccionada = { ...ruta }; this.mostrarModal = true; }

  eliminarRuta(ruta: Ruta): void {
    if (confirm(`¿Está seguro de eliminar la ruta ${ruta.nombre}? Esta acción no se puede deshacer.`) && this.rutaService.eliminarRuta(ruta.id)) {
      this.actualizarListado();
      this.toastService.danger('Ruta eliminada correctamente');
    }
  }

  guardarRuta(ruta: Omit<Ruta, 'id'>): void {
    if (this.rutaSeleccionada) {
      this.rutaService.actualizarRuta(this.rutaSeleccionada.id, ruta);
      this.toastService.info('Ruta actualizada correctamente');
    } else {
      this.rutaService.crearRuta(ruta);
      this.toastService.success('Ruta creada correctamente');
    }
    this.cerrarModal();
    this.actualizarListado();
  }

  filtrarRutas(): void {
    const termino = (this.filtroForm.get('busqueda')?.value ?? '').toLowerCase().trim();
    const sectorSeleccionado = this.filtroForm.get('sectorSeleccionado')?.value ?? '';
    this.rutasFiltradas = this.rutas.filter(ruta => {
      const coincideBusqueda = !termino || [ruta.nombre, ruta.sector, ruta.operador, ruta.horario].some(valor => valor.toLowerCase().includes(termino));
      return coincideBusqueda && (!sectorSeleccionado || ruta.sector === sectorSeleccionado);
    });
  }

  private actualizarListado(): void { this.rutas = this.rutaService.getRutas(); this.filtrarRutas(); }
}

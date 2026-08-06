import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { CompostajeModal } from './components/compostaje-modal/compostaje-modal';
import { Compostaje } from './interfaces/compostaje.interface';
import { CompostajeService } from './services/compostaje.service';
import { Subscription } from 'rxjs';

@Component({ selector: 'app-compostaje', standalone: true, imports: [ReactiveFormsModule, CompostajeModal], templateUrl: './compostaje.html', styleUrl: './compostaje.css' })
export class CompostajeComponent implements OnInit {
  compostajes: Compostaje[] = [];
  compostajesFiltrados: Compostaje[] = [];
  filtroForm: FormGroup;
  mostrarModal = false;
  compostajeSeleccionado: Compostaje | null = null;
  private actualizarListadoSub!: Subscription;
  constructor(private fb: FormBuilder, private compostajeService: CompostajeService, private toastService: ToastService) { this.filtroForm = this.fb.group({ busqueda: [''], estadoSeleccionado: [''] }); }
  ngOnInit(): void { this.actualizarListado(); this.filtroForm.valueChanges.subscribe(() => this.filtrarCompostajes()); }
  abrirModal(): void { this.compostajeSeleccionado = null; this.mostrarModal = true; }
  cerrarModal(): void { this.mostrarModal = false; this.compostajeSeleccionado = null; }
  editarCompostaje(registro: Compostaje): void { this.compostajeSeleccionado = { ...registro }; this.mostrarModal = true; }
  eliminarCompostaje(registro: Compostaje): void { if (confirm(`¿Está seguro de eliminar el registro ${registro.lote}? Esta acción no se puede deshacer.`) && this.compostajeService.delete(registro.id)) { this.actualizarListado(); this.toastService.danger('Registro de compostaje eliminado correctamente'); } }
  guardarCompostaje(registro: Omit<Compostaje, 'id'>): void { if (this.compostajeSeleccionado) { this.compostajeService.update(this.compostajeSeleccionado.id, registro); this.toastService.info('Registro de compostaje actualizado correctamente'); } else { this.compostajeService.create(registro); this.toastService.success('Registro de compostaje creado correctamente'); } this.cerrarModal(); this.actualizarListado(); }
  filtrarCompostajes(): void { const termino = (this.filtroForm.get('busqueda')?.value ?? '').toLowerCase().trim(); const estadoSeleccionado = this.filtroForm.get('estadoSeleccionado')?.value ?? ''; this.compostajesFiltrados = this.compostajes.filter(registro => (!termino || [registro.lote, registro.proceso, registro.observaciones].some(valor => valor.toLowerCase().includes(termino))) && (!estadoSeleccionado || registro.estado === estadoSeleccionado)); }
  claseEstado(estado: string): string { return estado === 'Activo' ? 'bg-success' : estado === 'Finalizado' ? 'bg-secondary' : 'bg-warning text-dark'; }
  private actualizarListado(): void {
    this.actualizarListadoSub = this.compostajeService.getAll().subscribe(data => {
      this.compostajes = data;
      this.filtrarCompostajes();
    });
  }

  ngOnDestroy(): void {
    if (this.actualizarListadoSub) {
      this.actualizarListadoSub.unsubscribe();
    }
  }

}

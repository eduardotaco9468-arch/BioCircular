import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { UsuarioModal } from './components/usuario-modal/usuario-modal';
import { Usuario } from './interfaces/usuario.interface';
import { UsuarioMockService } from './services/usuario-mock.service';

@Component({ selector: 'app-usuarios', standalone: true, imports: [ReactiveFormsModule, UsuarioModal], templateUrl: './usuarios.html', styleUrl: './usuarios.css' })
export class Usuarios implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  filtroForm: FormGroup;
  mostrarModal = false;
  usuarioSeleccionado: Usuario | null = null;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioMockService, private toastService: ToastService) {
    this.filtroForm = this.fb.group({ busqueda: [''], rolSeleccionado: [''] });
  }
  ngOnInit(): void { this.actualizarListado(); this.filtroForm.valueChanges.subscribe(() => this.filtrarUsuarios()); }
  abrirModal(): void { this.usuarioSeleccionado = null; this.mostrarModal = true; }
  cerrarModal(): void { this.mostrarModal = false; this.usuarioSeleccionado = null; }
  editarUsuario(usuario: Usuario): void { this.usuarioSeleccionado = { ...usuario }; this.mostrarModal = true; }
  eliminarUsuario(usuario: Usuario): void { if (confirm(`¿Está seguro de eliminar el usuario ${usuario.nombre}? Esta acción no se puede deshacer.`) && this.usuarioService.eliminarUsuario(usuario.id)) { this.actualizarListado(); this.toastService.danger('Usuario eliminado correctamente'); } }
  guardarUsuario(usuario: Omit<Usuario, 'id'>): void { if (this.usuarioSeleccionado) { this.usuarioService.actualizarUsuario(this.usuarioSeleccionado.id, usuario); this.toastService.info('Usuario actualizado correctamente'); } else { this.usuarioService.crearUsuario(usuario); this.toastService.success('Usuario creado correctamente'); } this.cerrarModal(); this.actualizarListado(); }
  filtrarUsuarios(): void { const termino = (this.filtroForm.get('busqueda')?.value ?? '').toLowerCase().trim(); const rol = this.filtroForm.get('rolSeleccionado')?.value ?? ''; this.usuariosFiltrados = this.usuarios.filter(usuario => (!termino || [usuario.nombre, usuario.correo, usuario.rol].some(valor => valor.toLowerCase().includes(termino))) && (!rol || usuario.rol === rol)); }
  private actualizarListado(): void { this.usuarios = this.usuarioService.getUsuarios(); this.filtrarUsuarios(); }
}

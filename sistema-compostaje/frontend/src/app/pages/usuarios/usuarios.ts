import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { UsuarioModal } from './components/usuario-modal/usuario-modal';
import { Usuario } from './interfaces/usuario.interface';
import { CrearUsuario } from './interfaces/crear-usuario.interface';
import { UsuarioService } from './services/usuario.service';

@Component({ selector: 'app-usuarios', standalone: true, imports: [ReactiveFormsModule, UsuarioModal], templateUrl: './usuarios.html', styleUrl: './usuarios.css' })
export class Usuarios implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  filtroForm: FormGroup;
  mostrarModal = false;
  usuarioSeleccionado: Usuario | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly usuarioService: UsuarioService,
    private readonly toastService: ToastService
  ) {
    this.filtroForm = this.fb.group({ busqueda: [''], rolSeleccionado: [''] });
  }

  ngOnInit(): void {
    this.actualizarListado();
    this.filtroForm.valueChanges.subscribe(() => this.filtrarUsuarios());
  }

  abrirModal(): void { this.usuarioSeleccionado = null; this.mostrarModal = true; }
  cerrarModal(): void { this.mostrarModal = false; this.usuarioSeleccionado = null; }
  editarUsuario(usuario: Usuario): void { this.usuarioSeleccionado = { ...usuario }; this.mostrarModal = true; }
  eliminarUsuario(usuario: Usuario): void {
    if (!confirm(`¿Está seguro de eliminar al usuario ${usuario.nombre}? Esta acción no se puede deshacer.`)) {
      return;
    }

    this.usuarioService.eliminarUsuario(usuario.id).subscribe({
      next: () => {
        this.toastService.success('Usuario eliminado correctamente');
        this.actualizarListado();
      },
      error: (error) => this.toastService.danger(this.mensajeError(error, 'eliminar'))
    });
  }

  guardarUsuario(usuario: CrearUsuario): void  {
    if (this.usuarioSeleccionado) {
      this.usuarioService.actualizarUsuario(this.usuarioSeleccionado.id, usuario).subscribe({
        next: () => {
          this.toastService.success('Usuario actualizado correctamente');
          this.cerrarModal();
          this.actualizarListado();
        },
        error: (error) => this.toastService.danger(this.mensajeError(error, 'actualizar'))
      });
      return;
    }

    this.usuarioService.crearUsuario(usuario).subscribe({
      next: () => {
        this.toastService.success('Usuario creado correctamente');
        this.cerrarModal();
        this.actualizarListado();
      },
      error: (error) => this.toastService.danger(this.mensajeError(error, 'crear'))
    });
  }

  filtrarUsuarios(): void {
    const termino = (this.filtroForm.get('busqueda')?.value ?? '').toLowerCase().trim();
    const rol = this.filtroForm.get('rolSeleccionado')?.value ?? '';
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      (!termino || [usuario.nombre, usuario.email, usuario.rol].some(valor => valor.toLowerCase().includes(termino))) &&
      (!rol || usuario.rol === rol)
    );
  }

  private actualizarListado(): void {

    this.usuarioService.getUsuarios()
      .subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios;
          this.usuariosFiltrados = usuarios;
        },
        error: (error) => this.toastService.danger(this.mensajeError(error, 'cargar'))
      });

  }

  private mensajeError(error: HttpErrorResponse, accion: 'crear' | 'actualizar' | 'eliminar' | 'cargar'): string {
    if (error.status === 403) return 'No tiene permisos para esta acción';
    if (error.status === 404) return 'Usuario no encontrado';
    if (error.status === 409) return 'El correo ya está registrado';
    if (error.status >= 500) return 'Error del servidor';
    return accion === 'cargar' ? 'No se pudieron cargar usuarios' : `No fue posible ${accion} el usuario`;
  }
}

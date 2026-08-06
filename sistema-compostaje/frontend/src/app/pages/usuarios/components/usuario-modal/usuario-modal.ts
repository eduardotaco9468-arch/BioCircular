import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { CrearUsuario } from '../../interfaces/crear-usuario.interface';
import { UsuarioForm } from '../usuario-form/usuario-form';

@Component({
  selector: 'app-usuario-modal',
  standalone: true,
  imports: [UsuarioForm],
  templateUrl: './usuario-modal.html',
  styleUrl: './usuario-modal.css'
})
export class UsuarioModal {

  @ViewChild(UsuarioForm) usuarioFormComponent?: UsuarioForm;

  @Input() usuarioEditar: Usuario | null = null;

  @Output() cerrar = new EventEmitter<void>();

  @Output() guardar = new EventEmitter<CrearUsuario>();


  cerrarModal(): void {

    if (
      this.usuarioFormComponent?.usuarioForm.dirty &&
      !confirm('¿Desea salir sin guardar los cambios?')
    ) {
      return;
    }

    this.cerrar.emit();

  }


  guardarUsuario(usuario: CrearUsuario): void {

    this.guardar.emit(usuario);

  }

}
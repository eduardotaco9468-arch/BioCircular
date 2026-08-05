import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from '../../../core/models/rol.enum';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorLogin = false;
  enviando = false;

  readonly loginForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() { return this.loginForm.controls.email; }
  get password() { return this.loginForm.controls.password; }

  ingresar(): void {
    this.errorLogin = false;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.enviando = true;
    const { email, password } = this.loginForm.getRawValue();
    this.authService.login(email, password).subscribe({
      next: (respuesta) => {
        this.authService.guardarSesion(respuesta);
        this.router.navigate([this.rutaPorRol(respuesta.rol)]);
      },
      error: () => {
        this.errorLogin = true;
        this.enviando = false;
      }
    });
  }

  private rutaPorRol(rol: string): string {
    const rutas: Record<Rol, string> = {
      [Rol.ADMIN]: '/admin',
      [Rol.OPERADOR]: '/operador',
      [Rol.CLIENTE]: '/cliente'
    };
    return rutas[rol as Rol] ?? '/login';
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(readonly authService: AuthService) {}

  cerrarSesion(): void {
    this.authService.cerrarSesion();
  }
}

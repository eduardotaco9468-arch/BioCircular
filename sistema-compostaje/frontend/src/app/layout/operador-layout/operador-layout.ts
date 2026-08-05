import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
@Component({ selector: 'app-operador-layout', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive, Navbar], templateUrl: './operador-layout.html', styleUrl: './operador-layout.css' })
export class OperadorLayout {}

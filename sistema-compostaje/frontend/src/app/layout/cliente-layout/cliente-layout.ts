import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
@Component({ selector: 'app-cliente-layout', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive, Navbar], templateUrl: './cliente-layout.html', styleUrl: './cliente-layout.css' })
export class ClienteLayout {}

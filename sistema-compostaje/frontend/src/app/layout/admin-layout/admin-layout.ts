import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
@Component({ selector: 'app-admin-layout', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive, Navbar], templateUrl: './admin-layout.html', styleUrl: './admin-layout.css' })
export class AdminLayout {}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo.model';
@Component({ selector: 'app-vehiculo-detail', standalone: true, imports: [CommonModule], templateUrl: './vehiculo-detail.component.html' })
export class VehiculoDetailComponent { @Input({ required: true }) vehiculo!: Vehiculo; }

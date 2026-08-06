import { Component } from '@angular/core';
import { Recolecciones } from '../../../../pages/recolecciones/recolecciones';
@Component({ selector: 'app-historial', standalone: true, imports: [Recolecciones], template: '<app-recolecciones />' })
export class Historial {}

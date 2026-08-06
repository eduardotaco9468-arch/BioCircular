import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Residuo } from '../../models/residuo.model';
import { ResiduoService } from '../../services/residuo.service';
import { Subscription } from 'rxjs';

@Component({ selector: 'app-residuo-list', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './residuo-list.html', styleUrl: './residuo-list.css' })
export class ResiduoList implements OnInit {
  residuos: Residuo[] = [];
  private cargarSub!: Subscription;
  constructor(private residuoService: ResiduoService, private router: Router) {}
  ngOnInit(): void { this.cargarResiduos(); }
  cargarResiduos(): void {
    this.cargarSub = this.residuoService.obtenerTodos().subscribe(data => {
      this.residuos = data;
    });
  }
  editar(residuo: Residuo): void { this.router.navigate(['/residuos/nuevo'], { state: { residuo } }); }
  eliminar(id: number): void { if (confirm('¿Está seguro de eliminar este tipo de residuo?')) { this.residuoService.eliminar(id).subscribe(); this.cargarResiduos(); } }

  ngOnDestroy(): void {
    if (this.cargarSub) {
      this.cargarSub.unsubscribe();
    }
  }

}

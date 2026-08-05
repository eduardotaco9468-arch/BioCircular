import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recolecciones } from './recolecciones';

describe('Recolecciones', () => {
  let component: Recolecciones;
  let fixture: ComponentFixture<Recolecciones>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Recolecciones] }).compileComponents();
    fixture = TestBed.createComponent(Recolecciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => { expect(component).toBeTruthy(); });
});

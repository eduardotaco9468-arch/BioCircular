import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidenciaModal } from './incidencia-modal';

describe('IncidenciaModal', () => {
  let component: IncidenciaModal;
  let fixture: ComponentFixture<IncidenciaModal>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [IncidenciaModal] }).compileComponents();
    fixture = TestBed.createComponent(IncidenciaModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => { expect(component).toBeTruthy(); });
});
